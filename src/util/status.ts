import * as vscode from 'vscode';
import {GitHubUser} from '../user';

const MESSAGE = "Coding {project} in VSCode {activity}{branding}";

export async function updateStatus(){
    const user = GitHubUser.getInstance();

    const projectName = vscode.workspace.name;
    if (!projectName){
        return await user.clearStatus();
    }

    let filePath = vscode.window.activeTextEditor?.document.fileName.split('\\');

    var activity;
    if(filePath){
        activity = `(editing ${filePath[filePath.length - 1]})`;
    }else{
        activity = '(idling)';
    }

    const config = vscode.workspace.getConfiguration('gitshare');

    if (user){
        let message = MESSAGE.replace("{project}", projectName);
        message = (config.showfile && (message.length + activity.length <= 80)) ? message.replace("{activity}", activity) : message.replace("{activity}", "");
        message = (config.branding && message.length <= 66) ? message.replace("{branding}", " | gs.kaan.xyz") : message.replace("{branding}", "");

        return await user.setStatus(message, config.emoji);
    }
}