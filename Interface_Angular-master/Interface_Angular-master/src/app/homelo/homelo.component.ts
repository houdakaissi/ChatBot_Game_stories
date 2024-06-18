 
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {  ViewChild, ElementRef } from '@angular/core';
import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { QueryService } from '../query.service';
interface MessageWithResponse {
  message: string;
  responsee: string;
}
interface QuestionResponse {
  question: string;
  response: string;
}
interface Message {
  content: string;
  userAvatar: string;
  // Add a prompt property to the Message interface
 
  showContent?: boolean;
}

interface Folder {
  id: string;
  path: string; // Represents the path to the folder
  messages: Message[];
}
 

@Component({
  selector: 'app-homelo',
  templateUrl: './homelo.component.html',
  styleUrl: './homelo.component.css'
})

export class HomeloComponent {
 
 // constructor(private apiService: ApiService) { }
 query: string = '';
  contextt: string= '' ;
  answer: string = '';
  
  getAnswer() {
    this.apiService.getAnswer(this.query, this.contextt).subscribe(
      (response:any) => {
        console.log(response);
        // Handle response here (e.g., display the answer on the UI)
      },
      (error: any) => {
        console.error(error);
        // Handle error here (e.g., display error message on the UI)
      }
    );
  }


 
  extended: boolean = false; 
  extended1: boolean = false; 
  extended2: boolean = false; 
  extended3: boolean = false; 
  extended4: boolean = false; 
  extende: boolean = false; 
  selectedIndex: number | null = null;
  sidebarExtended: boolean = true; 
  recentEntries: string[] = [];
  searchInput: string = "";
  context: string[];
  constructor(private router: Router ,private apiService: ApiService,private QueryService: QueryService) { 
    this.context = [];
  }
  updateRecentEntry() {
    // Check if searchInput is not empty before adding to recentEntries
    if (this.searchInput.trim() !== "") {
      this.recentEntries.push(this.searchInput);
      // Clear the input after saving
      this.searchInput = "";
    }
  }

  truncateText(text: string, maxLength: number): string {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    } else {
      return text;
    }
  }
 
  navigateToSignUp() {
    // Navigate to the desired route when "Sign up" is clicked
    this.router.navigateByUrl('/login'); // Replace '/signup' with your actual route path
  }
  logout() {
    // Navigate to the '/home' route
    this.router.navigateByUrl('/home');
  }


  @ViewChild('chatMessages') chatMessagesRef!: ElementRef;
  
  messages: string[] = [];
  messageInput: string = '';
/*
  sendMessage() {
    if (this.messageInput.trim() === "") return; // Check if input is empty
    
    this.messages.push(this.messageInput);
    this.messageInput = ""; // Clear input after sending message

    // Scroll chat to bottom after sending message
    setTimeout(() => {
      const chatMessages = this.chatMessagesRef.nativeElement;
      chatMessages.scrollTop = chatMessages.scrollHeight;
    });
  }
  */
  get areMessagesPresent(): boolean {
    return this.messages.length > 0;
  }

  showConversation: boolean = false;

  showChatMessages: boolean = false;
  selectedFolder: any;
  toggleConversation(text: string) {
    // You can handle logic here to load the chat messages related to the clicked text
    // For example, if you have a folder structure, you can filter based on the clicked text
    // Here I'm assuming you have a selectedFolder property and just setting it directly
    this.selectedFolder = this.savedTexts.find(item => item === text);
    this.showChatMessages = true;
}
  /*
  folders: any[] = [];
  createNewFolder() {
    const newFolder = {
      name: 'New Folder',
      messages: [] // Store messages for this folder
    };
    this.folders.push(newFolder);
  }
 
  */
  clearMessages() {
      this.messages = [];
  }
  
 
  /*
  // Function to save the message to the selected folder
  saveMessageToFolder(folderIndex: number) {
    if (this.messageInput.trim() !== '') {
      this.folders[folderIndex].messages.push(this.messageInput);
      this.messageInput = '';
    }
  }
*/

folders: Folder[] = [];
    //selectedFolder: Folder | null = null;
    //messageInput: string = '';
/*
    createNewFolder() {
        const newFolder: Folder = {
            id: this.generateUniqueId(),
            path: 'C:\Users\pc\Documents/conversation/' + this.generateUniqueId(), // Example path structure
            messages: []
        };
        this.folders.push(newFolder);
        this.selectedFolder = newFolder;
    }

    sendMessage() {
        if (this.selectedFolder) {
            const newMessage: Message = {
                content: this.messageInput,
                userAvatar: 'https://i.pinimg.com/originals/86/63/78/866378ef5afbe8121b2bcd57aa4fb061.jpg'
            };
            this.selectedFolder.messages.push(newMessage);
            this.messageInput = '';
        }
    }

    generateUniqueId(): any {
        // Generate a unique ID for the folder
    }
 */








    
    createNewFolder() {
      const newFolder: Folder = {
          id: this.generateUniqueId(),
          path: 'C:\\Users\\pc\\Documents\\conversation\\' + this.generateUniqueId(),
          messages: []
      };
      this.folders.push(newFolder);
      this.selectedFolder = newFolder;
  }

  sendMessage() {
      if (this.selectedFolder) {
          const newMessage: Message = {
              content: this.messageInput,
              userAvatar: 'https://i.pinimg.com/originals/86/63/78/866378ef5afbe8121b2bcd57aa4fb061.jpg'
              
          };
          this.selectedFolder.messages.push(newMessage);
          this.messageInput = '';
      }
     
  }
 
  generateUniqueId(): string {
      return Math.random().toString(36).substring(7);
  }
  displayMessage(message: Message) {
      alert("Message: " + message.content);
  }

 
  toggleMessageVisibility(message: Message) {
    message.content = message.content ? '' : ''; // Toggle message visibility
}
truncateInput(input: string) {
  if (input.length > 20) {
    this.inputText = input.substring(0, 20) + '...'; // Truncate input if it exceeds 20 characters
  }
}
 
inputText: string = '';
  savedTexts: string[] = [];
 
  saveText() {
    if (this.inputText.trim()) {
      this.savedTexts.push(this.inputText);
      this.inputText = ''; // Clear the input field
    }
  }
  promptText(text: string) {
    window.prompt("Copy to clipboard: Ctrl+C, Enter", text);
  }
 
  response: string = '.';

 
/*
  onSubmit(): void {
    this.QueryService.getAnswer({ query: this.query,context: this.context  })
    .subscribe((data: any) => {
      console.log('Server Response:', data); // Log the entire response object
      this.response = data[0]; // Access the response string correctly
      console.log('Response:', this.response); // Log the response value
      this.context.push(this.query);
    }, error => {
      console.error('Error:', error);
    });
  
  
}
 */
/*
onSubmit(): void {
  // Convert the array of strings into a single string
  const contextString = this.context.join(", ");

  this.QueryService.getAnswer({ query: this.query, context: contextString })
    .subscribe((data: any) => {
      console.log('Server Response:', data); // Log the entire response object
      this.response = data[0]; // Access the response string correctly
      console.log('Response:', this.response); // Log the response value
      this.context.push(this.query); // Add the current query to context
    }, error => {
      console.error('Error:', error);
    });
}
*/
questionResponses: QuestionResponse[] = [];
contexttt: string = '';
responseList: string[] = [];
messageList: MessageWithResponse[] = [];

onSubmit(): void {
  // Convert the array of strings into a single string
  const contextString = this.context.join(" ");
   // You can adjust the delimiter as needed
   
   const contextWithResponse = this.context! ? this.context! + ' ' + this.response : this.response+'FORTNITE';
  this.contextt='fortnite';
  //context: contextWithResponse 
   this.QueryService.getAnswer({ query: this.query,context: this.contextt })
   .subscribe((data: any) => {
       console.log('Server Response:', data); // Log the entire response object
       // Vérifier si data[0] est défini et n'est pas null avant de l'assigner à this.response
       if (data[0] !== null && data[0] !== undefined) {
           this.response = data[0]; // Access the response string correctly
           this.responseList.push(data[0]);
           console.log('Response:', this.response); // Log the response value
           this.messageList.push({ message: this.query, responsee: this.response });
           this.context.push(this.query); // Add the current query to context
           this.questionResponses.push({ question: this.query, response: this.response });
       } else {
           console.error('Error: Response is null or undefined');
       }
   }, error => {
       console.error('Error:', error);
   });

}

}
