/**
 * WordPress dependencies
 */
import { applyFilters } from '@wordpress/hooks';

/**
 * Internal dependencies
 */
import { defaultAutocompleters } from '../default-autocompleters';

describe( 'default-autocompleters', () => {
	it( 'provides default completers if none are provided', () => {
		const result = applyFilters( 'blocks.Autocomplete.completers', null );
		/*
		 * Assert structural equality because defaults are provided as a
		 * list of cloned completers (and not referentially equal).
		 */
		expect( result ).toEqual( defaultAutocompleters );
	} );

	it( 'does not provide default completers for empty completer list', () => {
		const emptyList = [];
		const result = applyFilters( 'blocks.Autocomplete.completers', emptyList );
		// Assert referential equality because the list should be unchanged.
		expect( result ).toBe( emptyList );
	} );

	it( 'does not provide default completers for a populated completer list', () => {
		const populatedList = [ {}, {} ];
		const result = applyFilters( 'blocks.Autocomplete.completers', populatedList );
		// Assert referential equality because the list should be unchanged.
		expect( result ).toBe( populatedList );
	} );

	it( 'provides copies of defaults so they may be directly modified', () => {
		const result = applyFilters( 'blocks.Autocomplete.completers', null );
		result.forEach( ( completer, i ) => {
			const defaultCompleter = defaultAutocompleters[ i ];
			expect( completer ).not.toBe( defaultCompleter );
			expect( completer ).toEqual( defaultCompleter );
		} );
	} );
} );
