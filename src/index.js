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


    fetchCountries(countryName.trim()).then(data => {
        
 
        if (data.length > 10) {
           
            Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
  
            return

        }
            else if (data.length > 2 && data.length < 10) {
            countryInfo.innerHTML = '';
          countryList.innerHTML =   makeMarkupList(data);
              
  
    
            
   
            
        }
           else if (data.length === 1) {
   
            countryList.innerHTML = '';
            countryInfo.innerHTML =makeMarkupInfoCountry(data);
  
             
 }
        
    }).catch(error => {
             if (countryName !== '') {
                 Notiflix.Notify.failure(`${error}`)
             }
         })
    
            
         

          
 

       

 

    
}

function makeMarkupList(elements) {

    return elements.map(element => {
        return `
    <li class='items-country' ><img src="${element.flags.svg}"  width="40px" height="40px" alt="Name Country"> ${element.name.official} </li>
      


    `
    }).join('');
};
function makeMarkupInfoCountry(elements) {
   
    return elements.map(element => {
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