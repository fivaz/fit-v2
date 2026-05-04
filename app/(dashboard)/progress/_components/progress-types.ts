export type ProgressProgramOption = {
	id: string;
	name: string;
};

export type ProgressWorkoutLog = {
	id: string;
	date: Date;
	program_id: string;
	duration_minutes: number;
	exercises_completed: number;
	calories_burned: number;
	notes: string;
};

export type ProgressWeeklyStats = {
	workouts: number;
	totalMinutes: number;
	totalCalories: number;
	avgDuration: number;
};
