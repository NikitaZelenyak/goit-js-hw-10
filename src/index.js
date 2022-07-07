import './css/styles.css';
import Notiflix from 'notiflix';
var debounce = require('lodash.debounce');
import fetchCountries from './fetchCountries';
const DEBOUNCE_DELAY = 300;
const input = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');
input.addEventListener('input',debounce(takeName,DEBOUNCE_DELAY) )




function takeName() {

    const countryName = input.value
    
    if (countryName === '') {
        
  
        countryList.innerHTML = '';
  
        countryInfo.innerHTML = '';
            

        return
        }


    fetchCountries(countryName.trim()).then(countries => {
        
 
        if (countries.length > 10) {
           
            Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
  
            return

        }
            else if (countries.length > 2 && countries.length < 10) {
            countryInfo.innerHTML = '';
          countryList.innerHTML =   makeMarkupList(countries);
              
  
    
            
   
            
        }
           else if (countries.length === 1) {
   
            countryList.innerHTML = '';
            countryInfo.innerHTML =makeMarkupInfoCountry(countries);
  
             
 }
        
    }).catch(error => {
             if (countryName !== '') {
                 Notiflix.Notify.failure(`${error}`)
             }
         })
    
            
         

          
 

       

 

    
}

function makeMarkupList(countries) {

    return countries.map(element => {
        return `
    <li class='items-country' ><img src="${element.flags.svg}"  width="40px" height="40px" alt="Name Country"> ${element.name.official} </li>
      


    `
    }).join('');
};
function makeMarkupInfoCountry(countries) {
   
    return countries.map(element => {
         const languages = Object.values(element.languages);

        return ` 
         <h2 class="country-title"> <img
        class="country-img"
        src="${element.flags.svg}"
        alt="country name"
        width="80px"
        height="80px"
      />${element.name.official}</h2>
      <ul>
        <li>Capital: <span>${element.capital}.</span></li>
        <li>Population: <span>${element.population}.</span></li>
        <li>Languages: <span>${languages}.</span></li>
      </ul>
  `
    }).join('');
   
}