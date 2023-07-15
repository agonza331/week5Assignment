// Create a menu app as seen in this week’s video. What you create is up
// to you as long as it meets the following requirements:

//Use at least one array.
//Use at least two classes.

//Your menu should have the options to create, view, and delete elements.
class Anime{
    constructor(name,episode){
        this.name=name
        this.episode=episode
    }
    describe(){
        return `${this.name} has ${this.episode} episodes`
    }
}
class Genre{
    constructor(name){
        this.name=name
        this.animes=[];
    }
    addAnime(anime){
        if (anime instanceof Anime){
            this.animes.push(anime)
        }else{
            throw new Error (`You can only add an instance of Anime. Argument is not a anime: ${anime}`)
         }
    }
    describe(){
        return `${this.name} has ${this.anime.length} anime series`
    }
}

class Menu {
    constructor(){
        this.genres=[];
        this.selectedGenre=null;
    }

    start(){
        let selection= this.showMainMenuOptions();

        while(selection!= 0){
            switch (selection){
                case '1':
                    this.createGenre();
                    break;
                case '2':
                    this.viewGenre()
                    break;
                case '3':
                    this.deleteGenre()
                    break;
                case '4':
                    this.displayGenres();
                    break;
                default:
                    selection=0
            }
            selection=this.showMainMenuOptions();
        }

        alert("Goodbye!");
    }
    showMainMenuOptions(){
        return prompt(`
        0) exit
        1) Create New Genre
        2) View Genres
        3) Delete Genre
        4) Display all Genres
        `);
    }

    showGenreMenuOptions(genreInfo){
        return prompt(`
        0) Back
        1) Create an Anime
        2) Delete an Anime
        --------------
        ${genreInfo}
        `);
    }

    displayGenres(){
        let genreString='';
        for (let i=0; i<this.genres.length; i++){
            genreString+=i +') ' + this.genres[i].name+ '\n';
        }
        alert(genreString);
    }
    createGenre(){
        let name =prompt('Enter a new Genre')
        this.genres.push(new Genre(name));
    }
//validate input by using the index correctly and 
    viewGenre(){
        let index= prompt('Enter the index of the genre you want to view');
        if (index> -1 && index < this.genres.length){
            this.selectedGenre= this.genres[index];
            let description = 'Name of Genre: ' + this.selectedGenre.name + '\n';
            

            for (let i=0; i< this.selectedGenre.animes.length; i++){
                description += i + ' ) ' + this.selectedGenre.animes[i].name + 
                ' - ' + this.selectedGenre.animes[i].episode + ' episodes';
            }

            let selection = this.showGenreMenuOptions(description)
            switch (selection){
                case '1':
                    this.createAnime()
                    break;
                case '2':
                    this.deleteAnime();
                    //dont need a break because that ends there
            }
        }
    }

    deleteGenre(){
        let index = prompt('Enter the index of the genre you want to delete: ')
        if (index > -1 && index < this.genres.length){
            this.genres.splice(index, 1);
        }
    }

    createAnime(){
        let name = prompt ('Enter a new Anime: ');
        let episode = prompt ('Enter how many episodes the anime has: ')
        this.selectedGenre.animes.push(new Anime(name, episode));
    }

    deleteAnime(){
        let index= prompt ("Enter the index of the anime you want to delete: ")
        if (index > -1 && index < this.selectedGenre.animes.length){
            this.selectedGenre.animes.splice(index,1);
        }
    }
}
let menu= new Menu();
menu.start();