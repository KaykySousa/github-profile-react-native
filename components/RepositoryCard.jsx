import { StyleSheet, Text, View } from "react-native"

export default function RepositoryCard({ name, language }) {
	return (
		<View style={styles.container}>
			<Text style={styles.repositoryName}>{name}</Text>
			<Text style={styles.repositoryDescription}>
				Linguagem: {language}
			</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#475569",
		padding: 12,
		marginBottom: 8,
		borderRadius: 8,
	},

	repositoryName: {
		color: "#d4d4d4",
		fontSize: 16,
		fontWeight: "bold",
	},

	repositoryDescription: {
		color: "#d4d4d4",
	},
})
