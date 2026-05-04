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







document.getElementById('contact-form').onsubmit = function(event) {
    // Zapobiegamy domyślnej akcji formularza (przeładowaniu strony)
    event.preventDefault();

   // Pobieramy wartości z pól formularza
    const firstName = document.getElementById('first-name').value.trim();
    const lastName = document.getElementById('last-name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    const errorBox = document.getElementById('error-message');

    // Czyścimy poprzednie komunikaty błędów
    errorBox.textContent = '';

    
    
   //czy wszystkie pola są wypełnione
    if (!firstName || !lastName || !email || !message) {
        errorBox.textContent = 'Wszystkie pola są wymagane!';
        return;
    }

    //nie zawierają cyfr
    const nameRegex = /\d/;
    if (nameRegex.test(firstName) || nameRegex.test(lastName)) {
        errorBox.textContent = 'Imię i nazwisko nie mogą zawierać cyfr!';
        return;
    }

    
    if (!email.includes('@') || !email.includes('.')) {
        errorBox.textContent = 'Podaj poprawny adres e-mail!';
        return;
    }

    
    alert('Formularz wysłany poprawnie!');
   // this.reset(); //nie jest koniecznie
};








//za 6
window.onload = function() {


    loadNotes(); 



    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            //json + js

            // umiejetnosci
            const skillsSection = document.getElementById('umiejetnosci');
            const h2 = document.createElement('h2');
            h2.textContent = data.umiejetnosci.tytul;
            skillsSection.appendChild(h2);

            const ul = document.createElement('ul');
            data.umiejetnosci.lista.forEach(skill => {
                const li = document.createElement('li');
                li.textContent = skill; 
                ul.appendChild(li);
            });
            skillsSection.appendChild(ul);

            // projekty
            const projectsSection = document.getElementById('projekty');
            const h2Proj = document.createElement('h2');
            h2Proj.textContent = data.projekty.tytul; 
            projectsSection.appendChild(h2Proj);

            const ol = document.createElement('ol');
            data.projekty.lista.forEach(project => {
                const li = document.createElement('li');
                li.textContent = project.nazwa + " "; 

                const link = document.createElement('a');
                link.href = project.link;
                link.textContent = project.linkTekst;
                link.target = "_blank";

                li.appendChild(link);
                ol.appendChild(li);
            });
            projectsSection.appendChild(ol);


            renderExtraSections(data); //extra sections

        }) // then end
        .catch(error => console.error("Błąd:", error)); 
};

//extra sections
function renderExtraSections(data) {
    // o mnie
    const aboutSection = document.getElementById('o_mnie');                   
    const h2About = document.createElement('h2');
    h2About.textContent = data.o_mnie.tytul; 
    aboutSection.appendChild(h2About);

    const pAbout = document.createElement('p');
    pAbout.textContent = data.o_mnie.opis; 
    aboutSection.appendChild(pAbout);
    


    // edukacja
    const eduSection = document.getElementById('edukacja');
    const h2Edu = document.createElement('h2');
    h2Edu.textContent = data.edukacja.tytul; 
    eduSection.appendChild(h2Edu);

    const pEdu = document.createElement('p');
    pEdu.textContent = data.edukacja.opis; 
    eduSection.appendChild(pEdu);




    // doswiadczenie
    const expSection = document.getElementById('doswiadczenie');
    const h2Exp = document.createElement('h2');
    h2Exp.textContent = data.doswiadczenie.tytul; 
    expSection.appendChild(h2Exp);

    //
    data.doswiadczenie.lista.forEach(exp => {
        const article = document.createElement('article'); // Tworzymy element article dla każdego doświadczenia
        
        const h3 = document.createElement('h3');
        h3.textContent = exp.stanowisko; // Dajemy nazwę stanowiska jako nagłówek
        
        const pData = document.createElement('p');
        pData.textContent = "Data: " + exp.data; // Dostajemy datę doświadczenia
        
        const pOpis = document.createElement('p');
        pOpis.textContent = "Opis: " + exp.opis; // Dostajemy opis doświadczenia

        // Dodajemy elementy do article
        article.appendChild(h3);
        article.appendChild(pData);
        article.appendChild(pOpis);
        
        // article na stronę
        expSection.appendChild(article);
    }   );
}



//zad 7 
const noteText = document.getElementById('note-text');
const addBtn = document.getElementById('add-btn');
const notesList = document.getElementById('notes-list');
const titleInput = document.getElementById('note-title');

addBtn.onclick = function() 
{
    const titleValue = titleInput.value.trim();
    const textValue = noteText.value.trim(); 
    
    if (titleValue && textValue) {
        createDynamicSection(titleValue, textValue);
        
        titleInput.value = '';
        noteText.value = '';
        
        saveNotes(); 
    }
};
function createDynamicSection(title, text) {
    const section = document.createElement('section');
    section.className = 'dynamic-note'; 

    const h2 = document.createElement('h2');
    h2.textContent = title;

    const p = document.createElement('p');
    p.textContent = text;

   
    section.appendChild(h2);
    section.appendChild(p);
    
   
    addDeleteButton(section); 
    
    notesList.appendChild(section);
}

function saveNotes() 
{
    const notes = []; // massiv
    
    // look for sections
    notesList.querySelectorAll('.dynamic-note').forEach(section => {
        // dostajemy title i text z każdej sekcji i tworzymy obiekt
        const noteData = {
            title: section.querySelector('h2').textContent,
            text: section.querySelector('p').textContent
        };
        notes.push(noteData); //dodajemy obiekt do masiva
    });
    
    // Zapisujemy massiv jako string w localStorage
    localStorage.setItem('notes', JSON.stringify(notes));
}

function loadNotes()
{
    // Pobieramy dane z localStorage i parsujemy je z powrotem
    const notes = JSON.parse(localStorage.getItem('notes')); 
    
    if (notes) {
        notes.forEach(note => {
            // zamiast li tworzymy sekcje dla każdej notatki
            createDynamicSection(note.title, note.text);
        });
    }
}     

function addDeleteButton(element) {
    const delBtn = document.createElement('button');
    delBtn.textContent = ' Usuń'; //   Tekst przycisku
    
    delBtn.onclick = function() {
        element.remove(); // Usuwamy notatkr z list
        saveNotes(); //Zapisujemy aktualizowaną listę notatek do localStorage
    };
    
    element.appendChild(delBtn); // Dodajemy przycisk do
}