import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

	const disposable = vscode.commands.registerCommand(
		'codelensai.debugProject',
		async () => {

			// Get all files from workspace
			const files = await vscode.workspace.findFiles(
				'**/*.{js,ts,jsx,tsx}',
				'**/node_modules/**'
			);

			const issues: string[] = [];

			for (const file of files) {

				try {

					// Read file content
					const document = await vscode.workspace.openTextDocument(file);
					const content = document.getText();

					// Simple debugging checks
					if (content.includes('console.log')) {
						issues.push(`⚠ Console log found: ${file.fsPath}`);
					}

					if (content.includes('any')) {
						issues.push(`⚠ any type used: ${file.fsPath}`);
					}

					if (content.includes('TODO')) {
						issues.push(`⚠ TODO found: ${file.fsPath}`);
					}

				} catch (error) {
					// Error reading file
				}
			}

			// Show result
			if (issues.length === 0) {
				vscode.window.showInformationMessage(
					'✅ No issues found in project'
				);
			} else {

				const outputChannel =
					vscode.window.createOutputChannel('CodeLensAI Debugger');

				outputChannel.clear();
				outputChannel.show(true);

				outputChannel.appendLine('=== CodeLensAI Debug Report ===\n');

				issues.forEach(issue => {
					outputChannel.appendLine(issue);
				});

				vscode.window.showWarningMessage(
					`Debug completed with ${issues.length} issues`
				);
			}
		}
	);

	context.subscriptions.push(disposable);
}

export function deactivate() {}