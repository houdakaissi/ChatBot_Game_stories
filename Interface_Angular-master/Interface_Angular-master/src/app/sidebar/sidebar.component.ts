import { Component } from '@angular/core';
import { Router } from '@angular/router';
 
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
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
  constructor(private router: Router) { }
  navigateToSignUp() {
    // Navigate to the desired route when "Sign up" is clicked
    this.router.navigateByUrl('/login'); // Replace '/signup' with your actual route path
  }


  
}
