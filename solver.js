(function(root,factory){
  var api=factory();
  if(typeof module==='object'&&module.exports)module.exports=api;
  if(root)root.LogicLimitSolver=api;
})(typeof globalThis!=='undefined'?globalThis:this,function(){
  'use strict';

  var DEFAULT_MAX_CANDIDATES=250000;
  var DEFAULT_MAX_SEARCH_SPACE=2000000;

  function normalizeSymbols(symbols){
    var list=Array.isArray(symbols)?symbols.slice():String(symbols||'').split('');
    list=list.map(function(x){return String(x).toUpperCase()});
    if(!list.length)throw new Error('symbols must not be empty');
    if(new Set(list).size!==list.length)throw new Error('symbols must be unique');
    return list;
  }

  function parseResult(result,length){
    if(result&&Number.isInteger(result.a)&&Number.isInteger(result.b))return{a:result.a,b:result.b};
    var text=String(result||'').trim().toUpperCase();
    if(text==='全中')return{a:length,b:0};
    var match=text.match(/^(\d+)A\s*(\d+)B$/);
    if(!match)throw new Error('invalid result: '+result);
    return{a:Number(match[1]),b:Number(match[2])};
  }

  function normalizeHistory(history,length,symbolSet){
    return(history||[]).map(function(item,index){
      var guess=String(item.guess||'').trim().toUpperCase();
      if(guess.length!==length)throw new Error('guess #'+(index+1)+' has invalid length');
      if(new Set(guess).size!==guess.length)throw new Error('guess #'+(index+1)+' contains duplicate symbols');
      for(var i=0;i<guess.length;i++)if(!symbolSet.has(guess[i]))throw new Error('guess #'+(index+1)+' contains unknown symbol');
      var parsed=parseResult(item.result!=null?item.result:item,length);
      if(parsed.a<0||parsed.b<0||parsed.a+parsed.b>length)throw new Error('guess #'+(index+1)+' has impossible score');
      return{guess:guess,a:parsed.a,b:parsed.b,index:index+1};
    });
  }

  function score(guess,answer){
    var a=0,b=0;
    for(var i=0;i<guess.length;i++){
      if(guess[i]===answer[i])a++;
      else if(answer.indexOf(guess[i])>=0)b++;
    }
    return{a:a,b:b};
  }

  function matchesHistory(candidate,history){
    for(var i=0;i<history.length;i++){
      var actual=score(history[i].guess,candidate);
      if(actual.a!==history[i].a||actual.b!==history[i].b)return false;
    }
    return true;
  }

  function permutationCount(poolSize,length){
    if(length>poolSize)return 0;
    var n=1;
    for(var i=0;i<length;i++){
      n*=poolSize-i;
      if(!Number.isSafeInteger(n))return Infinity;
    }
    return n;
  }

  function solve(options){
    options=options||{};
    var symbols=normalizeSymbols(options.symbols);
    var length=Number(options.length);
    if(!Number.isInteger(length)||length<1||length>symbols.length)throw new Error('invalid answer length');
    var symbolSet=new Set(symbols);
    var history=normalizeHistory(options.history,length,symbolSet);
    var maxCandidates=Number.isInteger(options.maxCandidates)?options.maxCandidates:DEFAULT_MAX_CANDIDATES;
    var maxSearchSpace=Number.isInteger(options.maxSearchSpace)?options.maxSearchSpace:DEFAULT_MAX_SEARCH_SPACE;
    var searchSpace=permutationCount(symbols.length,length);
    if(searchSpace>maxSearchSpace&&!options.allowLargeSearch){
      return{status:'search-space-too-large',complete:false,searchSpace:searchSpace,candidates:[],candidateCount:null,history:history};
    }

    var candidates=[],visited=0,truncated=false,used=new Array(symbols.length).fill(false),buffer=new Array(length);
    function walk(depth){
      if(truncated)return;
      if(depth===length){
        visited++;
        var candidate=buffer.join('');
        if(matchesHistory(candidate,history)){
          candidates.push(candidate);
          if(candidates.length>=maxCandidates)truncated=true;
        }
        return;
      }
      for(var i=0;i<symbols.length;i++){
        if(used[i])continue;
        used[i]=true;buffer[depth]=symbols[i];walk(depth+1);used[i]=false;
        if(truncated)return;
      }
    }
    walk(0);
    return{
      status:truncated?'candidate-limit-reached':'ok',
      complete:!truncated,
      searchSpace:searchSpace,
      visited:visited,
      candidates:candidates,
      candidateCount:truncated?null:candidates.length,
      history:history
    };
  }

  function extractFacts(options){
    options=options||{};
    var symbols=normalizeSymbols(options.symbols);
    var length=Number(options.length);
    var solved=options.solved||solve(options);
    if(!solved.complete)return{
      status:solved.status,
      complete:false,
      candidateCount:solved.candidateCount,
      impossibleLetters:[],confirmedLetters:[],impossiblePositions:{},confirmedPositions:{},
      basedOnGuessIndexes:(solved.history||[]).map(function(h){return h.index})
    };
    var candidates=solved.candidates;
    var impossibleLetters=[],confirmedLetters=[],impossiblePositions={},confirmedPositions={};
    if(!candidates.length)return{
      status:'contradiction',complete:true,candidateCount:0,
      impossibleLetters:[],confirmedLetters:[],impossiblePositions:{},confirmedPositions:{},
      basedOnGuessIndexes:(solved.history||[]).map(function(h){return h.index})
    };
    symbols.forEach(function(symbol){
      var occurrences=candidates.reduce(function(sum,c){return sum+(c.indexOf(symbol)>=0?1:0)},0);
      if(occurrences===0)impossibleLetters.push(symbol);
      if(occurrences===candidates.length)confirmedLetters.push(symbol);
      if(occurrences>0){
        var blocked=[],fixed=[];
        for(var pos=0;pos<length;pos++){
          var atCount=candidates.reduce(function(sum,c){return sum+(c[pos]===symbol?1:0)},0);
          if(atCount===0)blocked.push(pos+1);
          if(atCount===candidates.length)fixed.push(pos+1);
        }
        if(blocked.length)impossiblePositions[symbol]=blocked;
        if(fixed.length)confirmedPositions[symbol]=fixed;
      }
    });
    return{
      status:'ok',complete:true,candidateCount:candidates.length,
      impossibleLetters:impossibleLetters,
      confirmedLetters:confirmedLetters,
      impossiblePositions:impossiblePositions,
      confirmedPositions:confirmedPositions,
      basedOnGuessIndexes:(solved.history||[]).map(function(h){return h.index})
    };
  }

  function analyze(options){
    var solved=solve(options);
    var facts=extractFacts(Object.assign({},options,{solved:solved}));
    return{solver:solved,facts:facts};
  }

  return{
    version:'1.0.0',
    score:score,
    solve:solve,
    extractFacts:extractFacts,
    analyze:analyze,
    permutationCount:permutationCount,
    constants:{DEFAULT_MAX_CANDIDATES:DEFAULT_MAX_CANDIDATES,DEFAULT_MAX_SEARCH_SPACE:DEFAULT_MAX_SEARCH_SPACE}
  };
});
