import * as vscode from 'vscode';
import {toggle} from './commands';
import {GitHubUser} from './user';
import {updateStatus} from './util/status';

export async function activate(context: vscode.ExtensionContext) {
	if(GitHubUser.getInstance()){
		context.globalState.update('enabled', true);
		if(await updateStatus()){
			vscode.window.showInformationMessage("Enabled GitHub custom status sharing.");
		}
	}else{
		vscode.window.showWarningMessage("To use GitShare, set your GitHub token in the plugin settings.");
	}
	
	context.subscriptions.push(
		vscode.commands.registerCommand('gitshare.toggle', async() => await toggle(context))		
	);

	vscode.window.onDidChangeActiveTextEditor(async (event) => {
		await updateStatus();
	});

	vscode.workspace.onDidChangeConfiguration(async (event) =>{
		GitHubUser.getInstance()!.updateToken();

		if (context.globalState.get('enabled')){
			await updateStatus();
		}
	});
}

export async function deactivate() {
	await GitHubUser.getInstance()!.clearStatus();
}
