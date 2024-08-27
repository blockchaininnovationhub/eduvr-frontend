export const Board = () => {
    return(
        <div className="w-[1700px] h-[415px] flex flex-col overflow-y-auto bg-slate-900">
            <video className="w-full h-full object-cover" controls autoPlay preload="none">
                <source src="./videos/Big Buck Bunny.mp4" type="video/mp4" />
                <track
                    src="/path/to/captions.vtt"
                    kind="subtitles"
                    srcLang="en"
                    label="English"
                />
                Your browser does not support the video tag.
            </video>
        </div>
    );
}