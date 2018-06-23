# 10print_GOA

#### Perchè questo particolare insieme di leggi e non qualche altro?                  
                                

<br>

![gol](https://www.doc.ic.ac.uk/project/examples/2012/163/g1216326/img/gameoflife.png)

[Game of Life, Wikipedia](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life)<br>


Partendo dalla struttura di Game of Life e utilizzando come spunto il loop generativo di 10print
si sono creati tre pattern random con configurazione diverse tra loro.

[esempio](http://www.6502asm.com/) generatore pattern (simulazione 10 print)

[Video tutorial - 10print](https://www.youtube.com/watch?v=bEyTZ5ZZxZs)

[Video tutorial - GOL](https://www.youtube.com/watch?v=FWSR_7kZuYg&t=518s)


### strutturazione
La grafica di GOL viene sostituita con quella di 10print, al posto delle caselle (bianco - nero)
vengono generate delle linee diagonali opposte.


### regole
Le regole di GOL vengono sostituite e ampliate
in base al numero di vicini possono attuarsi le seguenti situazioni:
Morte, Scissione binaria, Riproduzione, Sovrappopolazione, Figlio tetrade, Stasi.

      if      ((board[x][y] == 1) && (neighbors <  2)) next[x][y] = 0;           // morte
      else if ((board[x][y] == 1) && (neighbors ==  3)) next[x][y] = 1;          // sissione binaria
      else if ((board[x][y] == 0) && (neighbors == 2 )) next[x][y] = 1;          // riproduzione
      else if ((board[x][y] == 1) && (neighbors >  4)) next[x][y] = 0;           // sovrapopolazione
      else if ((board[x][y] == 0) && (neighbors == 4)) next[x][y] = 1;           // figlio tetrade
      else                                             next[x][y] = board[x][y]; // stasi
![goa_base](https://raw.githubusercontent.com/legeinteukein/10print_GOA/master/infinito.JPG)
Esempio 1 - GOL Infinito, date le modifiche delle regole GOL il labirinto generato dal pattern non subisce una fase di stasi permanente.<br>
<br>
![goa_base](https://raw.githubusercontent.com/legeinteukein/10print_GOA/master/Sole.JPG)
Esempio 2 - GOL Sole, date le modifiche delle regole GOL e la modifica della disposizione delle linee, il pattern generato assume una conformazione a raggi che partono dall'angolo in alto a sinistra, da notare la disposizione delle linee, vicino ad angoli come 30°, 45°, 60°.<br>
<br>
![goa_base](https://raw.githubusercontent.com/legeinteukein/10print_GOA/master/intreccio.JPG)
Esempio 3 - GOL Intreccio, date le modifiche delle regole GOL e la suddivisione delle linee rispetto all'asse x e y si viene a generare un intreccio nel quadrante in alto a sinistra.<br><br>
