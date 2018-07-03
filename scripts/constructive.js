window['solveConstruct']=solveConstruct;  // for minification
// risolve il GAP con una semplice euristica costruttiva
function solveConstruct()
{  //alert("euristica costruttiva");
   var i,j,ii;
   var z = 0;

   startTime = new Date();
   var capLeft = cap.slice();
   
   sol = new Array(n);
   var dist = new Array(m);
   for(i=0;i<m;i++)
      dist[i] = new Array(2);
   
   for(j=0;j<n;j++)
   {
      for(i=0;i<m;i++)
      {
         dist[i][0] = req[i][j];
         dist[i][1] = i;
      }
      dist.sort(compareKey);
      
      ii = 0;
      while (ii<m)
      {  i = dist[ii][1];
         if(capLeft[i] >= req[i][j])
         {
            sol[j] = i;
            capLeft[i] -= req[i][j];
            z += c[i][j];
            break;
         }
         ii++;
      }
   }
   endTime   = new Date();
   timeDiff  = endTime - startTime; // time difference in ms
   
   var zcheck = checkSol(sol);
   document.getElementById("outputText").value += "\r\nCost "+z+" zcheck "+zcheck+" t.cpu (ms)="+timeDiff;
   console.log("Cost "+z+" zcheck "+zcheck+" sol "+sol);
   zub = z;
   console.log("Constructive, zub="+zub+" t.cpu (ms) ="+timeDiff);
   console.log(sol);
}

// ritorna <0 se a minore di b, >0 se maggiore e =0 se uguali
function compareKey(a,b)
{  if(a[0]==b[0])
      return 0;
   else
      return(a[0] < b[0] ? -1 : 1);
}