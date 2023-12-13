import { Link } from "react-router-dom";

export const SearchType = ({ motion }) => {
    return (
        <div className='flex flex-col items-center'>
            
            <section className='h-2/5 w-full flex items-center rounded-lg overflow-hidden pb-[1em]'>
            <div className = 'h-full w-full grid grid-cols-2 gap-0'>        
                    <div className = 'min-h-[50%]'>
                        <img className = 'h-full object-cover' src = 'https://firebasestorage.googleapis.com/v0/b/sessions-7df6d.appspot.com/o/utilities%2Fguitar.jpg?alt=media&token=2257fd1e-7224-40c8-bc20-9da1ecfc9fe9'/>
                    </div>
                    <div>
                        <img className = 'h-full object-cover' src = 'https://firebasestorage.googleapis.com/v0/b/sessions-7df6d.appspot.com/o/utilities%2Fflute.jpg?alt=media&token=05af9585-56b0-4752-9d26-9cd98d9e618d'/>
                    </div>
                    <div className = 'h-[10em] overflow-hidden'>
                        <img className = 'w-full object-cover' src = 'https://firebasestorage.googleapis.com/v0/b/sessions-7df6d.appspot.com/o/utilities%2Fviolin.jpg?alt=media&token=807f1b03-9ea0-4ebe-a4ed-80576659eb47'/>
                    </div>
                    <div className = 'h-[10em] overflow-hidden'>
                        <img className = 'h-full object-cover' src = 'https://firebasestorage.googleapis.com/v0/b/sessions-7df6d.appspot.com/o/utilities%2Fpiano.jpg?alt=media&token=25756921-0449-4ed8-9833-0483dbce5ffc' />
                    </div>
            </div>
                <div className='flex bg-white text-4xl font-bold text-blue-800 rounded-[50%] border border-black h-[4.5em] w-[4.5em] items-center absolute top-[10%] right-[30%] '>
                    <Link to="/search/users" className = 'text-center text-blue-800 '> Search Users</Link>
                </div>
           

            </section>




            <section className='h-1/5 flex items-center'>
                <h1 className='text-slate-500 text-4xl font-bold text-center'>LOOKING FOR SOMEONE TO JAM WITH?</h1>
            </section>

           
           
            <section className='h-2/5 flex items-center'>
                <Link to="/search/groups" className='cursor-pointer max-h-[80%] relative text-center rounded-lg overflow-hidden'>
                    <p className='absolute text-white top-[50%] left-[50%] font-bold text-4xl -translate-x-1/2 -translate-y-1/2 w-max'>Search Groups</p>
                    <img className='object-contain' src='https://firebasestorage.googleapis.com/v0/b/sessions-7df6d.appspot.com/o/utilities%2Forchestra.jpeg?alt=media&token=39d1a233-c2ca-441b-91d5-34c4f6ec5c40' alt='orchestra' />
                </Link>
            </section>
        </div>
    )
}