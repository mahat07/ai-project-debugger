"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = __importStar(require("vscode"));
function activate(context) {
    const disposable = vscode.commands.registerCommand('codelensai.debugProject', async () => {
        // Get all files from workspace
        const files = await vscode.workspace.findFiles('**/*.{js,ts,jsx,tsx}', '**/node_modules/**');
        const issues = [];
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
            }
            catch (error) {
                // Error reading file
            }
        }
        // Show result
        if (issues.length === 0) {
            vscode.window.showInformationMessage('✅ No issues found in project');
        }
        else {
            const outputChannel = vscode.window.createOutputChannel('CodeLensAI Debugger');
            outputChannel.clear();
            outputChannel.show(true);
            outputChannel.appendLine('=== CodeLensAI Debug Report ===\n');
            issues.forEach(issue => {
                outputChannel.appendLine(issue);
            });
            vscode.window.showWarningMessage(`Debug completed with ${issues.length} issues`);
        }
    });
    context.subscriptions.push(disposable);
}
function deactivate() { }
//# sourceMappingURL=extension.js.map