import { useState } from "react";
import { useGetAllCharacters } from "../hooks/api";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function AllCharacters() {
	const [page, setPage] = useState(1);
	const [search, setSearch] = useState("");
	const [searchInput, setSearchInput] = useState("");

	const { data } = useGetAllCharacters(page, search);

	const handleSearch = () => {
		setSearch(searchInput);
		setPage(1); // Reset to first page when searching
	};

	const handleClearSearch = () => {
		setSearchInput("");
		setSearch("");
		setPage(1);
	};

	const handlePageChange = (newPage: number) => {
		setPage(newPage);
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	const getStatusColor = (status: string) => {
		switch (status.toLowerCase()) {
			case "alive":
				return "text-green-400";
			case "dead":
				return "text-red-400";
			default:
				return "text-gray-400";
		}
	};

	return (
		<div className="min-h-screen bg-background text-foreground">
			<div className="container mx-auto p-6">
				<h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
					Rick and Morty Characters
				</h1>

				{/* Search Bar */}
				<div className="mb-8 flex gap-2 max-w-md mx-auto">
					<Input
						type="text"
						placeholder="Search by name or ID..."
						value={searchInput}
						onChange={(e) => setSearchInput(e.target.value)}
						onKeyDown={(e) => e.key === "Enter" && handleSearch()}
						className="flex-1"
					/>
					<Button onClick={handleSearch} variant="default">
						Search
					</Button>
					{search && (
						<Button onClick={handleClearSearch} variant="outline">
							Clear
						</Button>
					)}
				</div>

				{/* Results count */}
				{data.info && (
					<div className="mb-6 text-center text-muted-foreground">
						Showing {data.results.length} of {data.info.count} characters
						{search && ` (filtered)`}
					</div>
				)}

				{/* Character Grid */}
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
					{data.results.map((character) => (
						<div
							key={character.id}
							className="border border-border rounded-lg p-6 bg-card hover:shadow-lg transition-shadow duration-300 hover:scale-105 transform"
						>
							<div className="flex flex-col items-center mb-4">
								<Avatar className="w-32 h-32 mb-4 ring-2 ring-primary">
									<AvatarImage src={character.image} alt={character.name} />
									<AvatarFallback className="text-2xl">
										{character.name.charAt(0)}
									</AvatarFallback>
								</Avatar>
								<h2 className="text-xl font-bold text-center mb-2">
									{character.name}
								</h2>
								<div
									className={`text-sm font-semibold ${getStatusColor(
										character.status,
									)}`}
								>
									{character.status}
								</div>
							</div>

							<div className="flex flex-col gap-2 text-sm">
								<p className="text-muted-foreground">
									<span className="font-bold text-foreground">Species:</span>{" "}
									{character.species}
								</p>
								<p className="text-muted-foreground">
									<span className="font-bold text-foreground">Gender:</span>{" "}
									{character.gender}
								</p>
								<p className="text-muted-foreground">
									<span className="font-bold text-foreground">Origin:</span>{" "}
									{character.origin.name || "Unknown"}
								</p>
								<p className="text-muted-foreground">
									<span className="font-bold text-foreground">Location:</span>{" "}
									{character.location.name || "Unknown"}
								</p>
								{character.type && (
									<p className="text-muted-foreground">
										<span className="font-bold text-foreground">Type:</span>{" "}
										{character.type}
									</p>
								)}
							</div>
						</div>
					))}
				</div>

				{/* Pagination */}
				{data.info && data.info.pages > 1 && (
					<div className="flex justify-center items-center gap-2 mb-8">
						<Button
							onClick={() => handlePageChange(page - 1)}
							disabled={!data.info.prev}
							variant="outline"
						>
							Previous
						</Button>
						<div className="flex items-center gap-2">
							<span className="text-sm text-muted-foreground">
								Page {page} of {data.info.pages}
							</span>
						</div>
						<Button
							onClick={() => handlePageChange(page + 1)}
							disabled={!data.info.next}
							variant="outline"
						>
							Next
						</Button>
					</div>
				)}
			</div>
		</div>
	);
}
