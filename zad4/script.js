const styleLink = document.getElementById('theme-style');

const toggleBtn = document.getElementById('toggle-btn');
const mySection = document.getElementById('umiejetnosci');



document.getElementById('btn-red').onclick = function() 
{
    styleLink.href = 'red.css'; 
};


document.getElementById('btn-green').onclick = function()
{
    styleLink.href = 'green.css';
};


toggleBtn.onclick = function() {
    if (mySection.style.display === 'none') 
    {
        mySection.style.display = 'block';      
        toggleBtn.textContent = 'Ukryj sekcję'; 
    }
     else 
    {
        mySection.style.display = 'none';       
        toggleBtn.textContent = 'Pokaż sekcję'; 
    }
}