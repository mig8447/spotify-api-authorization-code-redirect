( function ( $ ) {
    /**
     * Get the current location parameters
     * @return  {Object}  The query parameters
     */
    function lGetCurrentLocationQueryParameters() {
        var lQueryParameters = {};
        // Remove the question mark from the search
        var lQuery = window.location.search.substring( 1 );

        if ( lQuery.length > 0 ){
            var lQueryParametersKeyValuePairs = lQuery.split( '&' );
            for (var i = 0; i < lQueryParametersKeyValuePairs.length; i++) {
                var lKeyValuePair = lQueryParametersKeyValuePairs[ i ].split( '=' );
                lQueryParameters[ lKeyValuePair[ 0 ] ] = decodeURIComponent( lKeyValuePair[ 1 ] );
            }
        }

        return lQueryParameters;
    }

    /**
     * Create a jQuery Element representing an authorization parameter
     * @return {jQuery} A jQuery Element that can be appended to the DOM
     */
    function lCreateAuthorizationParameterElement(pParameterName, pParameterValue) {
        return $( '<div></div>' )
            .addClass( 'authorizationParameter' )
            .append(
                $( '<h2></h2>' )
                    .addClass( 'authorizationParameter_name' )
                    .text( pParameterName )
            )
            .append(
                $( '<pre></pre>' )
                    .addClass( 'authorizationParameter_value' )
                    .text( pParameterValue )
            );
    }

    // Obtain an object containing the query parameters of the current location
    var lCurrentLocationQueryParameters = lGetCurrentLocationQueryParameters();
    if ( Object.keys( lCurrentLocationQueryParameters ).length > 0 ){
        // Traverse the object elements by key
        for ( var lKey in lCurrentLocationQueryParameters ) {
            // Append an authorization parameter element per key to the document's body
            $( '.authorizationParametersContainer' )
                .append( lCreateAuthorizationParameterElement( lKey, lCurrentLocationQueryParameters[ lKey ] ) );
        }
    } else {
        $( '.authorizationParametersContainer' )
            .append(
                $( '<p></p>' )
                    .addClass( 'noAuthorizationParametersFound' )
                    .text( 'No autorization parameters found in the URL' )
            );
    }
} )( jQuery );
