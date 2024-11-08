/**
 * 
 * @employSchema
 * @eventListeners
 * @sensibleDefaults
 * @svgSrc
 * @documentation
 * @iconUniformNames
 * @objectifyEventListeners
 * @documentationApi
 * @distinctEventListeners
 * @parentElementSelector
 * @minimizeProperties
 * @propertiesElemUnderscore
 * @propertify
 * @methodNamingConventions
 * @propertyNamingConventions
 * @htmlReadyMethods
 */




/**
 * 
 * @param {Object}                   schema
 * @param {HTMLElement|CSSRule}      schema.parent
 * @param {Boolean}                 [schema.htmlReady]
 * @param {String}                  [schema.form]
 * @param {String}                  [schema.value]
 * @param {Number}                  [schema.tabindex]
 * @param {URL}                     [schema.href]
 * @param {String}                  [schema.title]
 * @param {Object}                  [schema.link]
 * @param {URL}                     [schema.link.download]
 * @param {Object}                  [schema.states]
 * @param {HTMLSourceElement}       [schema.states[].text]
 * @param {SVGElement}              [schema.states[].icon]
 * @param {Number}                  [schema.states[].duration]
 * @param {Function}                [schema.onClick]
 * @param {Object[]}                [schema.eventListeners]
 * @param {String}                   schema.eventListeners[].type
 * @param {Function}                 schema.eventListeners[].listener
 */
function ButtonState( schema ) {

    /**
     * 
     * @property
     * @private
     */
    this._schema = schema;

    /**
     * 
     * @property
     * @private
     */
    this._wrapElem = null;

    /**
     * 
     * @property
     * @private
     */
    this._textElem = null;

    /**
     * 
     * @property
     * @private
     */
    this._iconElem = null;

    /**
     * 
     * @property
     * @private
     */
    this._parentElem = null;




    if ( typeof this._schema.parent === 'object' ) {

        this._parentElem = this._schema.parent;

    } else if ( typeof this._schema.parent === 'string' ) {

        this._parentElem = document.querySelector( this._schema.parent );

    }

    if ( schema.hasOwnProperty( 'htmlReady' ) && schema.htmlReady === true ) {

        this._createFromHTML();

    } else {

        this._createFromSchema();

    }

    if ( this._schema.hasOwnProperty( 'eventListeners' ) ) {

        for ( var i = 0 ; i < this._schema.eventListeners.length ; i++ ) {

            this._wrapElem.addEventListener(
                this._schema.eventListeners[ i ].type,
                this._schema.eventListeners[ i ].listener
            );

        }

    }

    if ( this._schema.hasOwnProperty( 'onClick' ) ) {

        this._wrapElem.addEventListener( 'click', this._schema.onClick );

    }

};

/**
 * 
 * @param {String} stateName 
 */
ButtonState.prototype.setState = function( stateName ) {

    this._wrapElem.className = '';
    this._wrapElem.classList.add( stateName, 'core' );
    this._textElem.innerHTML = this._schema.states[ stateName ].text;

    if ( this._iconElem !== null ) {

        this._wrapElem.removeChild( this._iconElem );
        this._iconElem = null;

    }

    if ( this._schema.states[ stateName ].hasOwnProperty( 'icon' ) ) {

        this._iconElem = document.createElement( 'SPAN' );
        this._iconElem.classList.add( 'icon' );
        this._iconElem.innerHTML = this._schema.states[ stateName ].icon;
        this._wrapElem.appendChild( this._iconElem );

    }

    if ( this._schema.states[ stateName ].hasOwnProperty( 'duration' ) ) {

        setTimeout( function(){

            this.setState( 'default' );

        }.bind( this ), this._schema.states[ stateName ].duration );

    }

};

/**
 * 
 * @param {String} stateName 
 */
ButtonState.prototype.removeState = function( stateName ) {

    this._wrapElem.classList.remove( stateName );
    this._textElem.innerHTML = this._schema.states[ 'default' ].text;

    if ( this._iconElem !== null ) {

        this._wrapElem.removeChild( this._iconElem );
        this._iconElem = null;

    }

    if ( this._schema.states[ 'default' ].hasOwnProperty( 'icon' ) ) {

        this._iconElem = document.createElement( 'SPAN' );
        this._iconElem.classList.add( 'icon' );
        this._iconElem.innerHTML = this._schema.states[ 'default' ].icon;
        this._wrapElem.appendChild( this._iconElem );

    }

};

/**
 * 
 * @param {String} stateName 
 * @returns {Boolean}
 */
ButtonState.prototype.hasState = function( stateName ) {

    return this._wrapElem.classList.contains( stateName );

};

/**
 * 
 * @method
 * @param {Object} states 
 */
ButtonState.prototype.setStates = function( states ) {

    this._schema[ 'states' ] = states;

    this._textElem.innerHTML = this._schema.states[ 'default' ].text;

    if ( this._schema.states[ 'default' ].hasOwnProperty( 'icon' ) ) {

        this._iconElem = document.createElement( 'SPAN' );
        this._iconElem.classList.add( 'icon' );
        this._iconElem.innerHTML = this._schema.states[ 'default' ].icon;
        this._wrapElem.appendChild( this._iconElem );

    }

};




/**
 * 
 * @private
 * @method
 */
ButtonState.prototype._createFromHTML = function() {

    this._wrapElem = this._parentElem.querySelector( '.default.core' );
    this._textElem = this._parentElem.querySelector( '.textElem' );

    if ( this._parentElem.querySelector( '.icon' ) ) {

        this._iconElem = this._parentElem.querySelector( '.icon' );

    }

};

/**
 * 
 * @private
 * @method
 */
ButtonState.prototype._createFromSchema = function() {

    if ( this._schema.hasOwnProperty( 'href' ) ) {

        this._parentElem.setAttribute( 'href', this._schema.href );

    }

    if ( this._schema.hasOwnProperty( 'title' ) ) {

        this._parentElem.setAttribute( 'title', this._schema.title );

    }

    var fragment = document.createDocumentFragment();

    if ( this._schema.hasOwnProperty( 'link' ) ) {

        this._wrapElem = document.createElement( 'A' );
        this._wrapElem.setAttribute( 'href', this._schema.link );

        if ( this._schema.link.hasOwnProperty( 'download' ) ) {

            this._wrapElem.setAttribute( 'download', this._schema.link.download );

        }

    } else {

        this._wrapElem = document.createElement( 'BUTTON' );

    }

    this._wrapElem.classList.add( 'default', 'core' );
    fragment.appendChild( this._wrapElem );

    this._textElem = document.createElement( 'P' );
    this._textElem.classList.add( 'textElem' );
    this._textElem.textContent = '...';
    this._wrapElem.appendChild( this._textElem );

    if ( this._schema.hasOwnProperty( 'form' ) ) {

        this._wrapElem.setAttribute( 'form', this._schema.form );
        this._wrapElem.setAttribute( 'type', 'submit' );

    }

    if ( this._schema.hasOwnProperty( 'value' ) ) {

        this._wrapElem.setAttribute( 'value', this._schema.value );

    }

    if ( this._schema.hasOwnProperty( 'tabindex' ) ) {

        this._wrapElem.setAttribute( 'tabindex', this._schema.tabindex );

    }

    if ( this._schema.hasOwnProperty( 'states' ) ) {

        this._textElem.innerHTML = this._schema.states[ 'default' ].text;

        if ( this._schema.states[ 'default' ].hasOwnProperty( 'icon' ) ) {

            this._iconElem = document.createElement( 'SPAN' );
            this._iconElem.classList.add( 'icon' );
            this._iconElem.innerHTML = this._schema.states[ 'default' ].icon;
            this._wrapElem.appendChild( this._iconElem );

        }

    }

    this._parentElem.appendChild( fragment );

};