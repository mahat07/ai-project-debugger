import * as vscode from 'vscode';
import { analyzeCode } from './geminiService';

export function activate(context: vscode.ExtensionContext) {

	const disposable = vscode.commands.registerCommand(
		'codelensai.debugProject',
		async () => {

			const files = await vscode.workspace.findFiles(
				'**/*.{js,ts,jsx,tsx}',
				'**/node_modules/**'
			);

			const outputChannel =
				vscode.window.createOutputChannel('CodeLensAI Debugger');

			outputChannel.clear();
			outputChannel.show(true);

			outputChannel.appendLine('=== AI Debug Report ===\n');

			for (const file of files) {

				try {

					const document =
						await vscode.workspace.openTextDocument(file);

					const content = document.getText();

					// Skip very large files
					if (content.length > 15000) {
						continue;
					}

					outputChannel.appendLine(
						`\nAnalyzing: ${file.fsPath}\n`
					);

					// Gemini AI analysis
					const aiResponse = await analyzeCode(content);

					outputChannel.appendLine(aiResponse);
					outputChannel.appendLine(
						'\n---------------------------------\n'
					);

				} catch (error) {

					outputChannel.appendLine(
						`Error analyzing file: ${file.fsPath}`
					);
				}
			}

			vscode.window.showInformationMessage(
				'AI debugging completed'
			);
		}
	);

	context.subscriptions.push(disposable);
}

export function deactivate() {}