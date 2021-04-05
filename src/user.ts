import * as vscode from 'vscode';
import {GraphQLClient} from 'graphql-request';
import {statusChangeMutation} from './util/queries';
import {StatusResponse} from './util/types';

export class GitHubUser{
    private static instance: GitHubUser;
    private static readonly ENDPOINT = "https://api.github.com/graphql";

    private token: string;
    private client: GraphQLClient;
  

    private constructor(token: string){
        this.token = token;
        this.client = null as any;
    }

    public static getInstance(): GitHubUser{
        if(GitHubUser.instance){
            return GitHubUser.instance;
        }else{
            const token = vscode.workspace.getConfiguration('gitshare').token;

            if(token){
                GitHubUser.instance = new GitHubUser(token);

                GitHubUser.instance.client = new (GraphQLClient as any) (GitHubUser.ENDPOINT, {
                    headers: {Authorization: `bearer ${token}`}
                });
        
                return GitHubUser.instance;
            }
        }

        return null as any;
    }

    public async setStatus(message: string, emoji: string){
        const vars = {
            "status":{
                "message": message,
                "emoji": emoji
            }
        };

        var data: StatusResponse;
        try{
            data = await this.client.request(statusChangeMutation, vars);
        }catch(e){
            vscode.window.showErrorMessage("Invalid GitHub auth token. You must set a valid personal access token with the user scope in plugin settings. To suppress this message, toggle sharing off.");
            return false;
        }

        if (data.changeUserStatus.status){
            return true;
        }else{
            vscode.window.showErrorMessage("Invalid GitHub emoji configured in plugin settings. For a full list of valid emojis see https://go.kaan.xyz/emojis. To suppress this message, toggle sharing off.");
            return false;
        }
    }

    public async clearStatus(){
        const vars = {
            "status":{
            }
        };

        try{
            await this.client.request(statusChangeMutation, vars);
        }catch(e){
            vscode.window.showErrorMessage("Invalid GitHub auth token. You must set a valid personal access token with the user scope in plugin settings. To suppress this message, toggle sharing off.");
            return false;
        }

        return true;
    }

    public updateToken(){
        this.token = vscode.workspace.getConfiguration('gitshare').token;

        this.client = new (GraphQLClient as any) (GitHubUser.ENDPOINT, {
            headers: {Authorization: `bearer ${this.token}`}
        });
    }
}