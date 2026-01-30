import { Skeleton } from "./ui/skeleton";

export default function CharactersSkeleton() {
	return (
		<div className="min-h-screen bg-background text-foreground">
			<div className="container mx-auto p-6">
				{/* Title Skeleton */}
				<Skeleton className="h-10 w-96 mx-auto mb-8" />

				{/* Search Bar Skeleton */}
				<div className="mb-8 flex gap-2 max-w-md mx-auto">
					<Skeleton className="h-10 flex-1" />
					<Skeleton className="h-10 w-20" />
					<Skeleton className="h-10 w-20" />
				</div>

				{/* Results count Skeleton */}
				<Skeleton className="h-5 w-64 mx-auto mb-6" />

				{/* Character Grid Skeleton */}
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
					{Array.from({ length: 8 }).map((_, index) => (
						<div
							key={index}
							className="border border-border rounded-lg p-6 bg-card"
						>
							<div className="flex flex-col items-center mb-4">
								{/* Avatar Skeleton */}
								<Skeleton className="w-32 h-32 rounded-full mb-4" />
								{/* Name Skeleton */}
								<Skeleton className="h-6 w-32 mb-2" />
								{/* Status Skeleton */}
								<Skeleton className="h-4 w-16" />
							</div>

							<div className="flex flex-col gap-2">
								<Skeleton className="h-4 w-full" />
								<Skeleton className="h-4 w-full" />
								<Skeleton className="h-4 w-3/4" />
								<Skeleton className="h-4 w-5/6" />
								<Skeleton className="h-4 w-2/3" />
							</div>
						</div>
					))}
				</div>

				{/* Pagination Skeleton */}
				<div className="flex justify-center items-center gap-2 mb-8">
					<Skeleton className="h-10 w-24" />
					<Skeleton className="h-5 w-32" />
					<Skeleton className="h-10 w-24" />
				</div>
			</div>
		</div>
	);
}
