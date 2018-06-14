/**
* Copyright (c) 2015-present, yhtml5.com, Inc.
* All rights reserved.
*/
define(function () { 'use strict';

function debug( name ){
  let key =  '%c' + name;
  let c = hold[name] || null;
  if ( !c ) {
      let i = count % colors.length;
      c = 'color:' + colors[i];
      count++;
      hold[name] = c;
  }

  let show = true;
  if( filter ) {
      if ( regs === undefined) {
          check_filter();
      }
      show = check_show( name );
  }

  function logger( first , ...arg ){

      if ( enable && show ) {

          var t = new Date();
          var d = t.getTime() - time.getTime();
          var e = 'ms';
          if ( d > 1000 ) {
              d = Math.round( d / 1000 );
              e = 's';
          }
          var m = d + e;
          time = t;
          return log( key,  c , first ,  ...arg , m );
      }
  }
  return logger;
}

return debug;

});
