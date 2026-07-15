export function TaskVideo({ videoUrl } : {videoUrl? : string}) {
    if (!videoUrl) {
        return (
            <div className="bg-white rounded-full flex items-center justify-center h-40 mb-4">
                <span className="text-gray-500">Видео опаздывает =)</span>
            </div>
        );
    }

    return (
        <div className="mb-4">
            {/*embed-видео*/}
        </div>
    );
}