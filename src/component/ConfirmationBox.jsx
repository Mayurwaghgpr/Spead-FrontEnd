

function ConfirmationBox({ isConfirmBox, setConfirmBox, setIsConfirm }) {
    const handleCancel = () => {
        setIsConfirm(false)
        setConfirmBox(prev => ({
            ...prev,
            status: false
        }));
    };

    const handleConfirm = () => {
        setIsConfirm(true);
        setConfirmBox(prev => ({
            ...prev,
            status: false
        }));
    };
  return (
      <div className='flex justify-center items-center bg-transparent'>
          <div className='p-3 flex flex-col justify-between inset-0 self-center justify-self-center fixed backdrop-blur-xl bg-cyan-100 h-[200px] hover:border-double shadow-md sm:w-[400px] rounded-xl'>
              <div className='text-lg flex justify-between'>
                  <h1>Confirmation</h1>
                  <button 
                      className=' bg-inherit hover:shadow-xl bg-none ' onClick={handleCancel}>
                      <i className="bi bi-x-lg"></i>
                    </button>
              </div>
              <div className=' w-full'>
                  <p>{isConfirmBox?.message}</p>
                </div>
              <div className='flex justify-end gap-3 mb-0 w-full items-end '>
                  <button onClick={handleCancel} name='cancel' className=' bg-white p-2 rounded-3xl'>Cancel</button>
                  <button onClick={handleConfirm} name='confirm' className='p-2 rounded-3xl bg-slate-400'>Confirm</button>
              </div>
            </div>
    </div>
  )
}

export default ConfirmationBox