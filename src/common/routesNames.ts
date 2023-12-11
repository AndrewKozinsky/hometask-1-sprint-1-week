const RoutesNames = {
	testingAllData: '/testing/all-data',
	videos: '/videos',
	video(videoId: number | string) {
		return '/videos/' + videoId
	},
}

export default RoutesNames
