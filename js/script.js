Vue.config.devtools = true;

new Vue({
    el: `#app`,
    data: {
        // Lista contatti
        contacts: [
            {
                name: 'Michele',
                avatar: '_1',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        text: 'Hai portato a spasso il cane?',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        text: 'Ricordati di dargli da mangiare',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 16:15:22',
                        text: 'Tutto fatto!',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Fabio',
                avatar: '_2',
                visible: true,
                messages: [
                    {
                        date: '20/03/2020 16:30:00',
                        text: 'Ciao come stai?',
                        status: 'sent'
                    },
                    {
                        date: '20/03/2020 16:30:55',
                        text: 'Bene grazie! Stasera ci vediamo?',
                        status: 'received'
                    },
                    {
                        date: '20/03/2020 16:35:00',
                        text: 'Mi piacerebbe ma devo andare a fare la spesa.',
                        status: 'sent'
                    }
                ],
            },
            {
                name: 'Samuele',
                avatar: '_3',
                visible: true,
                messages: [
                    {
                        date: '28/03/2020 10:10:40',
                        text: 'La Marianna va in campagna',
                        status: 'received'
                    },
                    {
                        date: '28/03/2020 10:20:10',
                        text: 'Sicuro di non aver sbagliato chat?',
                        status: 'sent'
                    },
                    {
                        date: '28/03/2020 16:15:22',
                        text: 'Ah scusa!',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Luisa',
                avatar: '_4',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        text: 'Lo sai che ha aperto una nuova pizzeria?',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        text: 'Si, ma preferirei andare al cinema',
                        status: 'received'
                    }
                ],
            },
        ],

        search: [],// vengono inseriti gli elementi della ricerca
        Chatter: [],// vengono inserite le chat aperte
        openChat: [],// viene inserita la chat con qui si vuole chattare
        keyword: "",//testo all'interno dell'input di ricerca 
        keyMessage: "",//testo all'interno dell'input per l'invio di messaggi 
        chooseTheList: true,//valore che serve per la scelta della lista da far viualizzare, le liste sono quella della ricerca contatti e quella delle chat aperte

    },

    methods: {
        //serve per la ricerca dell'uttente con cui si vuole parlare, cercherà in "contacts"
        ricerca: function () {
            this.chooseTheList = true//cambio il valore in true così da far visualizzare la lista della ricerca
            this.search = [];//svuota l'elemento, così che la lista visualizzi sempre e solo gli uttenti che corrispondono al testo appena inserito
            for (let x = 0; x < this.contacts.length; x++) {//questo ciclo serve per esaminare gli elementi dentro i contatti
                // |controllo che sia stato inserito qualcosa nell'input e poi se le lettere dei nomi posti all'interno dei contatti (entrambe messe maiuscole) corrispondono
                if (this.keyword.length > 0 && this.keyword.toUpperCase() === this.contacts[x].name.toUpperCase().slice(0, this.keyword.length)) {

                    if (!this.search.includes(this.contacts[x])) {//controllo se l'elemnto è stato gia inserito nella lista degli elementi cercato così che non si creino doppioni di uno stesso contatto

                        this.search.push(this.contacts[x]);

                    }
                }
            }
        },
        //serve per aggiungere la chat alla lista delle chat aperte
        addChat: function (chat) {
            this.search = [];//svuoto l'input della ricerca
            this.keyword = "";//svuoto la scritta all'interno dell'input
            if (!this.Chatter.includes(chat)) {//controllo che il contatto che sto puscando non sia già nella lista delle chat aperte
                this.Chatter.push(chat)
            }
            this.chooseTheList = false//cambio il valore così da farmi visualizzare le chat aperte
        },


       // FUNZIONE CHE SERVE PER ELIMINARE LE CHAT E LE CONVERSAZIONI
       deleteChat: function (index) {
        if (index === false) {
            this.openChat = [];//se index è uguale a false cancellera solo la conversazione aperta
        } else {
            if (this.openChat.length > 0) {//se si schiaccerà la x per eliminare la chat nella lista chat aperte verrà eliminata la chat in questione e anche tutti i messaggi con quella conversazione
                if (this.openChat[0].name === this.Chatter[index].name && this.openChat[0].avatar === this.Chatter[index].avatar) {
                    this.openChat[0].messages = []
                    this.openChat = [];
                }
            }

            this.Chatter.splice(index, 1);
        }
    },



        //serve per aprire la chat con cui si vuole messaggiare
        open: function (selectChat) {
            this.openChat = [selectChat];
        },
        //serve per l'invio del messaggio
        sentMessage: function () {
            let d = new Date().getDate() + "/" + new Date().getMonth() + "/" + new Date().getFullYear() + " " + new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds();

            this.openChat[0].messages.push({
                text: this.keyMessage,
                date: d,
                status: 'sent'
            });
            //simulazione di risposta da parte dell'interlocutore
            this.openChat[0].messages.push({
                text: "ok",
                date: d,
                status: 'received'
            });

            this.keyMessage = "";
        }


    }
})
