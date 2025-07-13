import { Component } from '@angular/core';

import { GlassLoadingCloseOnViewInitComponent } from './../../glass/glass-loading-close-on-view-init/glass-loading-close-on-view-init.component';

@Component({
  selector: 'resume-page',
  imports: [GlassLoadingCloseOnViewInitComponent],
  templateUrl: './resume.component.html',
  styleUrl: './resume.component.scss'
})
export class ResumeComponent {

  downloadPDF() {
    
    //Dir from public
    const pdfUrl = './pages/resume/resume.pdf';
    const pdfName = 'resume_LucasMiranda.pdf';

    //Create a link element
    const a = document.createElement('a');
    a.setAttribute('style', 'display:none');
    document.body.appendChild(a);

    //Set the HREF to the PDF path
    a.href = pdfUrl;
    a.download = pdfName;
    a.click();

    //Clean up
    window.URL.revokeObjectURL(pdfUrl);

  }

}
