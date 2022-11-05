import { useState } from "react"
import {
	Button,
	Image,
	SafeAreaView,
	ScrollView,
	StatusBar,
	StyleSheet,
	Text,
	TextInput,
	View,
} from "react-native"
import RepositoryCard from "./components/RepositoryCard"

export default function App() {
	const [userNameInput, setUserNameInput] = useState("")
	const [userName, setUserName] = useState("")
	const [profilePicture, setProfilePicture] = useState("")
	const [repositories, setRepositories] = useState([])

	async function handleSubmit() {
		try {
			const resUser = await fetch(
				`https://api.github.com/users/${userNameInput}`,
				{
					method: "GET",
				}
			)

			const user = await resUser.json()

			const resRepos = await fetch(
				`https://api.github.com/users/${userNameInput}/repos`,
				{
					method: "GET",
				}
			)

			const repos = await resRepos.json()

			setUserName(user.login)
			setProfilePicture(user.avatar_url)
			setRepositories(repos)
		} catch (error) {
			setUserName("")
			setProfilePicture("")
			setRepositories([])
		}
	}

	return (
		<SafeAreaView style={styles.app}>
			<StatusBar backgroundColor="#334155" barStyle="light-content" />
			<View style={styles.container}>
				<Image
					style={styles.profilePicture}
					source={
						profilePicture
							? {
									uri: profilePicture,
							  }
							: require("./assets/images/notfound_profile_picture.png")
					}
				/>
				<Text style={styles.textName}>
					{userName || "Usuário Inválido"}
				</Text>
				<TextInput
					style={styles.inputName}
					placeholder="Nome de usuário"
					defaultValue={userNameInput}
					onChangeText={(value) => {
						setUserNameInput(value)
					}}
				/>
				<View style={styles.buttonContainer}>
					<Button title="BUSCAR" onPress={handleSubmit} />
				</View>
			</View>
			{repositories.length > 0 && (
				<ScrollView style={styles.repositoriesContainer}>
					{repositories.map((repository, index) => (
						<RepositoryCard
							key={index}
							name={repository.name}
							language={repository.language}
						/>
					))}
				</ScrollView>
			)}
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	app: {
		flex: 1,
		backgroundColor: "#334155",
		alignItems: "center",
		justifyContent: "center",
		padding: 16,
	},

	container: {
		backgroundColor: "#475569",
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 8,
		padding: 24,
		marginBottom: 12,
	},

	profilePicture: {
		height: 150,
		width: 150,
		borderRadius: 75,
	},

	textName: {
		color: "#d4d4d4",
		marginTop: 12,
		fontSize: 20,
	},

	inputName: {
		height: 48,
		width: "100%",
		backgroundColor: "#64748b",
		borderRadius: 2,
		paddingHorizontal: 8,
		color: "#d4d4d4",
		marginTop: 12,
		fontSize: 16,
	},

	buttonContainer: {
		width: "100%",
		marginTop: 8,
	},

	repositoriesContainer: {
		width: "100%",
	},
})
