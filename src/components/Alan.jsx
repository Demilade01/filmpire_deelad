import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import alanBtn from '@alan-ai/alan-sdk-web';
import { fetchToken } from '../utils';


import { ColorModeContext } from '../utils/ToggleColorMode';
import { searchMovie, selectGenreOrCategory } from '../features/currentGenreOrCategory';
import { useDispatch } from 'react-redux';

const useAlan = () => {
    const { setMode } = useContext(ColorModeContext);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        alanBtn({
            key: '2e4bc65d1669de1199666b9c0b8f26422e956eca572e1d8b807a3e2338fdd0dc/stage',
            onCommand: ({command, mode, genres, genreOrCategory, query}) => {
              if(command === 'chooseGenre' && genres && genreOrCategory){
                const foundGenre = genres.find((g) => g.name.toLowerCase() === genreOrCategory.toLowerCase());

                if(foundGenre) {
                    navigate.push('/')
                    dispatch(selectGenreOrCategory(foundGenre.id));
                }else {
                    const category = genreOrCategory.startsWith('top') ? 'top_rated' : genreOrCategory;
                    navigate.push('/')
                    dispatch(selectGenreOrCategory(category));
                }
              }else if (command === 'changeMode') {
                if (mode === 'light') {
                    setMode('light');
                }else {
                    setMode('dark');
                }
              } else if( command === 'Login') {
                fetchToken();
              } else if( command === 'Logout') {
                localStorage.clear();
                window.location.href = "/";
              }else if (command === 'search') {
                dispatch(searchMovie(query));
              }
            }
        });
      }, []);

    };


export default useAlan;