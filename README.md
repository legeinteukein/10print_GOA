# 10print_GOA

#### Perchè questo particolare insieme di leggi e non qualche altro?                  
                                

<br>

![gol](https://www.doc.ic.ac.uk/project/examples/2012/163/g1216326/img/gameoflife.png)

[Game of Life, Wikipedia](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life)<br>

Come vorrei si generasse il pattern
[esempio](http://www.6502asm.com/)

### strutturazione
arancione = predatore - carnivoro // compie spostamenti
azzurro = preda - erbivoro // compie spostamenti
verde = vegetazione // non compie spostamenti

### regole
Arancione mangia azzurro, non verde
Azzurro mangia verde, non arancione
Verde non mangia

Spostamenti casuali fin tanto che caselle entrano in contatto tra di loro per prossimità <br>
(un lato o un vertice si toccano)

![goa_base](https://raw.githubusercontent.com/legeinteukein/10print_GOA/master/GOA.jpg)
