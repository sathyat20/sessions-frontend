import {useParams, useSearchParams, useNavigate} from 'react-router-dom';

export const UserResult = ({result, userId}) => {
    const navigate = useNavigate();

    if (result.id === userId) {return;}
    else {
    return (
                <div
                    className="flex flex-row p-[0.5em] bg-white text-black border-[1px] border-slate-300 rounded-md shadow-md overflow-hidden hover:cursor-pointer scale-100 transition-all active:scale-95 mb-[1em]"
                    onClick={() => {
                        navigate(`/userprofile/${result.id}`)
                    }}
                    id={`searchresult-${result.id}`}
                >
                    <div className="flex flex-col justify-center pr-2">
                        <div className="w-[6em] h-[6em] aspect-square items-center rounded-full overflow-hidden bg-white">
                            <img
                                src={result.profilePictureUrl}
                                className="object-cover h-full w-full"
                                alt="your next star player"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col pl-[1em] h-[100%] pt-[3%]">
                        <p className="font-bold text-[1.5rem]">
                            {result.fullName}
                        </p>
                        <p className="text-slate-400 leading-0">
                            {result.careerStatus}
                        </p>
                        {/* <p className="font-semibold">{user.instruments[0].name}</p> */}
                    </div>
                </div>
            
        
    )
}
}