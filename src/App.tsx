import { Suspense, useEffect } from "react";
import AllCharacters from "./components/all-characters";
import CharactersSkeleton from "./components/characters-skeleton";

function App() {
	useEffect(() => {
		// Enable dark mode
		document.documentElement.classList.add("dark");
	}, []);

	return (
		<div className="min-h-screen bg-background">
			<Suspense fallback={<CharactersSkeleton />}>
				<AllCharacters />
			</Suspense>
		</div>
	);
}

export default App;
