const RoutesNames = {
	testingAllData: '/testing/allData',
	videos: '/videos',
	video(videoId: number | string) {
		return '/videos' + videoId
	}
}

export default RoutesNames