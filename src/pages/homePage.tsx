import React from 'react'

const HomePage = () => {
  return (
    <div className={'h-full w-full flex flex-col justify-center px-5'}>
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            기기 토큰
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="device-token" type="text" placeholder="기기 토큰"/>
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button">
            입장하기
          </button>
          <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
            토큰이 없으신가요?
          </a>
        </div>
      </form>
      <p className="text-center text-gray-500 text-xs">
        &copy;2022 최신 기술 프로젝트 2 TEAM SSD
      </p>
      <div className={'w-full'}></div>
    </div>
  );
}
export default HomePage;