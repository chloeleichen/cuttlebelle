/***************************************************************************************************************************************************************
 *
 * Setup a new  environment for the init option
 *
 * Init      - Check if you already have folders in the current directory
 * CopyStuff - Copy folders into the working directory
 *
 * @flow
 **************************************************************************************************************************************************************/

'use strict';


//--------------------------------------------------------------------------------------------------------------------------------------------------------------
// Dependencies
//--------------------------------------------------------------------------------------------------------------------------------------------------------------
import FsExtra from 'fs-extra';
import Path from 'upath';
import Fs from 'fs';


//--------------------------------------------------------------------------------------------------------------------------------------------------------------
// Local
//--------------------------------------------------------------------------------------------------------------------------------------------------------------
import { CopyFiles, CreateDir } from './files';
import { Log, Style } from './helper';
import { SETTINGS } from './settings';


/**
 * Check if you already have folders in the current directory
 */
export const Init = () /*: void */ => {
	Log.info(`Creating pages for you`);

	const _hasContent = Fs.existsSync( SETTINGS.get().folder.content );
	const _hasAssets = Fs.existsSync( SETTINGS.get().folder.assets );

	if( _hasContent || _hasAssets ) {
		if( _hasContent ) {
			Log.info(`Found content in ${ Style.yellow( SETTINGS.get().folder.content ) }`);
		}

		if( _hasAssets ) {
			Log.info(`Found content in ${ Style.yellow( SETTINGS.get().folder.assets ) }`);
		}

		Log.info(`There were already files or folders in the content, component or assets folder.`);
	}
	else {
		CopyStuff( 'content' );
		CopyStuff( 'assets' );
		Log.done(`Successfully created a clean slate`);
	}
}


/**
 * Copy folders into the working directory
 *
 * @param  {string} folder - The name of the folder
 */
export const CopyStuff = ( folder /*: string */ ) /*: void */ => {
	const source = Path.normalize(`${ __dirname }/../.template/init/${ folder }`);
	const destination = SETTINGS.get().folder[ folder ];

	CreateDir( destination );

	FsExtra.copySync( source, destination );
}
