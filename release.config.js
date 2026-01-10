module.exports = {
	branches: ["main"],
	plugins: [
		[
			"@semantic-release/commit-analyzer",
			{
				preset: "conventionalcommits",
			},
		],
		[
			"@semantic-release/release-notes-generator",
			{
				preset: "conventionalcommits",
				presetConfig: {
					types: [
						{ type: "feat", section: "✨ Features" },
						{ type: "fix", section: "🐛 Bug Fixes" },
						{ type: "style", section: "💄 Style" },
						{ type: "refactor", section: "♻️ Refactoring" },
						{ type: "perf", section: "⚡ Performance" },
						{ type: "test", section: "🧪 Tests" },
						{ type: "build", section: "🏗️ Build" },
						{ type: "ci", section: "👷 CI" },
						{ type: "chore", section: "🧹 Chores" },
						{ type: "docs", section: "📝 Documentation" },
					],
				},
			},
		],
		"@semantic-release/changelog",
		[
			"@semantic-release/npm",
			{
				npmPublish: false,
			},
		],
		[
			"@semantic-release/git",
			{
				assets: ["package.json", "pnpm-lock.yaml", "CHANGELOG.md"],
				message: "chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}",
			},
		],
		"@semantic-release/github",
	],
};
