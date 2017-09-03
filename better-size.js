// Сreated by vereschak@gmail.com

// -----------------------------------------
// -------- Maximum height setting  --------
// -----------------------------------------
;( function ( $ ) {
    var BetterSize = function ( el, obj ) {
        var _ = this;
        _.wrapper = el;

        var defaults = {
            elements: null,
            childClass: "content", 
            afterChange: null
        };

        _.options = $.extend( defaults, obj );

        return _.init();
    };
    BetterSize.prototype.resize = function () {
        var _ = this,
            maxSize = 0;

        _.elements.each( function ( index, element ) {
            var textH = $( this ).find( "." + _.options.childClass ).innerHeight();
            maxSize < textH ? ( maxSize = textH ) : "";
        } );
        if ( maxSize != _.oldSize ) {
            _.elements.css( "height", maxSize );
            _.oldSize = maxSize;
            if ( typeof _.options.afterChange === "function" ) _.options.afterChange.call( _, _.wrapper, maxSize );
        }

        return _.wrapper;
    };
    BetterSize.prototype.winLoad = function () {
        var _ = this;

        window.addEventListener( "load", _.resize.bind( this ) );
        window.addEventListener( "resize", _.resize.bind( this ) );
    };
    BetterSize.prototype.init = function () {
        var _ = this;

        _.elements = ( _.options.elements ? _.wrapper.find( _.options.elements ) : _.wrapper.find( ">div" ) );
        _.elements.each( function ( index, element ) {
            var div = document.createElement( "div" );
            $( div ).addClass( _.options.childClass ).append( this.childNodes );
            this.appendChild( div );
        } );

        _.winLoad();
        return _.resize();
    };
    $.fn.betterSize = function ( obj ) {
        var _ = this;
        for ( var i = 0; i < _.length; i++ ) {
            if ( Object.prototype.toString.call( obj ) === "[object Object]" ||
                obj === undefined ) {
                return _[ i ].BetterSize = new BetterSize( $( this[ i ] ), obj );
            } else if ( typeof _[ i ].BetterSize[ obj ] === "function" ) {
                return _[ i ].BetterSize[ obj ]();
            }
        }
    };
} )( jQuery );