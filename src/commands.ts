import * as vscode from 'vscode';
import {GitHubUser} from './user';
import {updateStatus} from './util/status';

export async function toggle(context: vscode.ExtensionContext) {
    let enabled = context.globalState.get('enabled');
    enabled = !enabled;
    context.globalState.update('enabled', enabled);

    if (enabled){
        if (await updateStatus()){
            vscode.window.showInformationMessage("Enabled GitHub custom status sharing.");
        }
    } else{
        if(await GitHubUser.getInstance().clearStatus()){
            vscode.window.showInformationMessage("Disabled GitHub custom status sharing.");
        }
    } 		
}
