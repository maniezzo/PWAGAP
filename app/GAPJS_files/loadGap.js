function readWithCORS()
{  var resp;
   var req = new XMLHttpRequest();
   var inText = document.getElementById("inputRemote").value;
   if ('withCredentials' in req) 
   {  req.open('GET', 'http://astarte.csr.unibo.it/gapdata/'+inText, true);
      req.onreadystatechange = function() 
      {
        if (req.readyState === 4) 
            if (req.status >= 200 && req.status < 400) 
            {  jInstance=JSON.parse(req.responseText);
               setInstance(jInstance);
            }
            else 
               alert('reading error');
       };
      req.send();
   }
}

// legge file dati locale
function loadLocalFile() 
{
   var input, file, fr;

   if (typeof window.FileReader !== 'function') {
      alert("The file API isn't supported on this browser yet.");
      return;
   }

   input = document.getElementById("inputLocal");
   if (!input) {
      alert("Couldn't find the fileinput element.");
   }
   else if (!input.files) {
      alert("This browser doesn't seem to support the `files` property of file inputs.");
   }
   else if (!input.files[0]) {
      alert("Please select a file before clicking 'Load'");
   }
   else {
      file = input.files[0];
      fr = new FileReader();
      fr.onload = receivedText;
      fr.readAsText(file);
   }
}

// elaborazione dei dati letti in locale
function receivedText(e) 
{
   istanza = e.target.result;
   jInstance = JSON.parse(istanza);
   setInstance(jInstance);
}

function setInstance(jInstance)
{
   n = jInstance.numcustomers;   // num clienti
   m = jInstance.numfacilities;  // num server
   c = jInstance.cost;   // matrice dei costi
   req = jInstance.req;  // matrice delle richieste
   cap = jInstance.cap;  // vattore delle capacità
   alert("Got instance "+jInstance.name+" n="+n);
}

