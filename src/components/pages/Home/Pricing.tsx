import React from 'react';

function Pricing() {
  return (
    <>
      <div className='flex flex-wrap justify-center py-10 border-t border-gray-400'>
        <div className='text-center w-full mb-10'>
          <h2 className='text-2xl mb-4'>Start free 7-day trial</h2>
          <select className='mb-4 p-2 text-white rounded shadow-sm'>
            <option value='monthly'>Monthly billing</option>
            <option value='yearly'>Yearly billing</option>
          </select>
          <p className='text-lg font-semibold'>Save 2 months</p>
        </div>

        {/* Card Sections */}
        {['Starter', 'Pro', 'Premium'].map((title, idx) => (
          <div
            key={idx}
            className='flex justify-center items-center mb-5 w-full'
          >
            <div className='border-2 border-gray-400 rounded-xl shadow-sm p-0 w-full max-w-xs transition-all duration-300 ease-in-out hover:translate-y-[-5px] hover:shadow-md'>
              <div className='p-8'>
                <h3 className='text-xl mb-4'>{title}</h3>
                <p className='text-base mb-6'>$7.99/month</p>
                <ul className='mb-6 list-inside list-disc'>
                  <li className='mb-2 text-xs text-gray-500'>
                    20 credits monthly
                  </li>
                  <li className='mb-2 text-xs text-gray-500'>
                    Samples, Stems & MIDI
                  </li>
                  <li className='mb-2 text-xs text-gray-500'>
                    Unlimited One-Shot downloads
                  </li>
                </ul>
                <div className='flex justify-center'>
                  <button className='bg-blue-500 text-white rounded-full py-3 px-5 text-sm cursor-pointer transition-all duration-300 ease-in-out hover:bg-white hover:text-black'>
                    Try free
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Pricing;
