import { Component, AfterViewInit, ViewChild, NgZone } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { Draggable, EventReceiveArg } from '@fullcalendar/interaction';
import { Candidature, Status } from 'src/app/objects/CandidatureObject';
import { createEmptyInterview, Interview } from 'src/app/objects/InterviewObject';
import { CandidatureService } from 'src/app/services/Candidature/candidature.service';
import { AuthService } from '../../services/auth.service';
import { User } from 'src/app/objects/UserObject';
import { InterviewService } from '../../services/Interview/interview.service';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { createEmptyFeedback, Feedback, Rating } from 'src/app/objects/FeedBackObject';
import { FeedBackService } from 'src/app/services/FeedBack/feedback.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements AfterViewInit {
  noteEval: string ="";
  listCandidat: Candidature[] | undefined = [];
  selectedCandidat?: Candidature;
  interview: Interview = createEmptyInterview();
  managers: User[] = [];
  selectedManager!: User | null;
  selectedTime: string = '';
  selectedLocation: string = "";
  rh !: User | undefined;
  canceled: boolean = true;
  droppedEvent!: EventReceiveArg;
  @ViewChild('fullcalendar') calendarComponent!: FullCalendarComponent;
  calendarOptions!: CalendarOptions;
  listCandidatOrig: Candidature[] | undefined = [];
  EvalCandidat!: Candidature | undefined;
  listInterview: Interview[] | undefined = [];
  selectedRating: Rating=Rating.BIEN ;
  feedBack!:Feedback;
  constructor(
    private feedBackService:FeedBackService,
    private ngZone: NgZone,
    private candidatureService: CandidatureService,
    private authService: AuthService,
    private interviewService: InterviewService
  ) { }

  ngOnInit(): void {
    this.feedBack=createEmptyFeedback()
    this.loadCandidatures();
    this.loadManagers();
    this.authService.getUserFromServer().subscribe(user => {
      this.rh = user;
      console.log("User retrieved:", this.rh);
    }, error => {
      console.error("Error fetching user:", error);
    });    console.log(this.rh)
    this.loadInterviews();


    this.calendarOptions = {
      plugins: [dayGridPlugin, interactionPlugin],
      initialView: 'dayGridMonth',
      editable: false,
      droppable: true,
      selectable: true,
      height: 'auto',
      events: [],
      eventTimeFormat: { hour: undefined, minute: undefined },
      eventReceive: this.handleEventReceive.bind(this),
      eventContent: (arg) => this.customEventContent(arg)

    };
  }

  customEventContent(arg: any) {
    let div = document.createElement('div');
    div.className = 'fc-event-title py-2 cursor-pointer bg-red-300 flex items-center space-x-2 justify-between';

    let span = document.createElement('span');
    span.innerText = arg.event.title;

    let img = document.createElement('img');
    img.src = '../../assets/images/eval.png';
    img.alt = 'Event Image';
    img.className = 'w-5 h-5 rounded-full';

    div.appendChild(span);
    div.appendChild(img);
    div.addEventListener('click', () => {
      this.ngZone.run(() => {
        console.log(arg.event.title)
        if (this.listCandidatOrig)
          this.EvalCandidat = this.listCandidatOrig.find(x => x.name == arg.event.title)
        console.log(this.EvalCandidat)
        this.openEvalModal();
      });
    });
    return { domNodes: [div] };
  }

  ngAfterViewInit(): void {
    new Draggable(document.getElementById('external-events')!, {
      itemSelector: '.fc-event',
      eventData: function (eventEl) {
        return {
          title: eventEl.innerText
        };
      }
    });
  }

  loadCandidatures() {
    this.candidatureService.getAllCandidature().subscribe({
      next: (candidates) => {
        this.listCandidatOrig = candidates
        this.interviewService.getInterviews().subscribe({
          next: (interviews) => {
            this.listInterview=interviews
            const assignedCandidatureIds = new Set(interviews.map(interview => interview.candidature.id));
            this.listCandidat = candidates.filter(candidat => {return !assignedCandidatureIds.has(candidat.id)&& candidat.status==Status.TO_BE_CONVOKED});
            console.log('✅ Candidatures filtrées:', this.listCandidat);
          },
          error: (error) => {
            console.error('❌ Erreur lors du chargement des entretiens:', error);
          }
        });
      },
      error: (error) => {
        console.error('❌ Erreur lors du chargement des candidatures:', error);
      }
    });
  }

  loadManagers() {
    this.authService.getManagers().subscribe({
      next: (managers) => {
        this.managers = managers;
        console.log('✅ Liste des managers chargée:', this.managers);
      },
      error: (error) => {
        console.error('❌ Erreur lors du chargement des managers:', error);
      }
    });
  }

  handleEventReceive(eventReceiveInfo: EventReceiveArg) {
    let droppedDate = eventReceiveInfo.event.start;
    let eventTitle = eventReceiveInfo.event.title;
    this.droppedEvent = eventReceiveInfo
    if (droppedDate) this.interview.date = droppedDate;
    console.log('📅 Date sélectionnée:', this.interview.date);
    this.selectedCandidat = this.listCandidat?.find(candidat => candidat.name === eventTitle);

    if (this.selectedCandidat) {
      this.listCandidat = this.listCandidat?.filter(candidat => candidat.name !== eventTitle);
      if (this.listCandidat)
        this.listCandidat = [...this.listCandidat];
    }
    this.openModal();
  }


  openModal() {
   console.log(this.authService.user)
    const modal = document.getElementById('exampleModalMessage');
    if (modal) {
      modal.classList.remove('opacity-0', 'pointer-events-none');
      modal.classList.add('opacity-100', 'pointer-events-auto');
    }
  }

  closeModal() {
    const modal = document.getElementById('exampleModalMessage');
    if (modal) {
      modal.classList.remove('opacity-100', 'pointer-events-auto');
      modal.classList.add('opacity-0', 'pointer-events-none');
      if (this.selectedCandidat && this.canceled)
        this.listCandidat?.push(this.selectedCandidat)
    }
    this.clearAllEvents()
  }
  openEvalModal() {
    const modal = document.getElementById('modalEval');
    if (modal) {
      modal.classList.remove('opacity-0', 'pointer-events-none');
      modal.classList.add('opacity-100', 'pointer-events-auto');

    }
  }

  closeEvalModal() {
    console.log("text")

    const modal = document.getElementById('modalEval');
    if (modal) {
      modal.classList.remove('opacity-100', 'pointer-events-auto');
      modal.classList.add('opacity-0', 'pointer-events-none');
    }
  }


  clearAllEvents() {
    let calendarApi = this.calendarComponent.getApi();
    const eventToDelete = calendarApi.getEvents().find(x => {
      return x.title == this.droppedEvent.event.title
    })
    console.log(eventToDelete)
    if (eventToDelete) {

      eventToDelete.remove()
    }
  }
  sendInterview() {
    if (!this.selectedCandidat || !this.selectedManager || !this.interview.date || !this.selectedTime) {
      alert('❌ Veuillez remplir tous les champs avant de valider.');
      return;
    }
    const [hours, minutes] = this.selectedTime.split(":").map(Number);
    console.log(this.selectedCandidat)
    console.log(this.selectedManager)
    console.log(this.rh)

    this.interview.date.setHours(hours, minutes, 0, 0);
    let newInterview: Interview = {
      date: this.interview.date,
      location: this.selectedLocation,
      motif: "",  // Ajout du champ 'motif'
      phase:"PHASE1_RH",  // Ajout du champ 'phase'
      candidature: this.selectedCandidat,
      manager: this.selectedManager,
      rh: this.rh
    };

    this.canceled = false
    console.log(this.rh)

    this.interviewService.saveInterview(newInterview).subscribe({
      next: (response) => {
        console.log('✅ Entretien enregistré avec succès:', response);
        alert('Entretien enregistré avec succès !');
        this.resetForm();
        this.closeModal();
        this.canceled = true
      },
      error: (error) => {
        console.error('❌ Erreur lors de l\'enregistrement:', error);
        alert('Une erreur est survenue lors de l\'enregistrement.');
      }
    });
    this.interviewService.getInterviews().subscribe({
      next: (interviews) => {
        const assignedCandidatureIds = new Set(interviews.map(interview => interview.candidature.id));
        console.log('✅ Candidatures filtrées:',interviews);
      },
      error: (error) => {
        console.error('❌ Erreur lors du chargement des entretiens:', error);
      }
    });
    this.loadInterviews();
  }
  sendEvaluation() {
    this.feedBack.feedback=this.noteEval;
    this.feedBack.rating=this.selectedRating;
    console.log(this.EvalCandidat?.id)
    this.interviewService.getinterviewbyCandidat(this.EvalCandidat?.id).subscribe({
      next: (interview) => {
        console.log(interview)
        this.feedBack.interview=interview
      },})
console.log(this.feedBack)
    this.feedBackService.saveFeedback(this.feedBack).subscribe({
      next: (feedBack) => {
        console.log(feedBack)
      },})
      this.closeEvalModal()
  }

  loadInterviews() {
    this.interviewService.getInterviews().subscribe({
      next: (interviews) => {
        console.log(interviews)
        this.calendarOptions.events = interviews.map(interview => ({
          title: `${interview.candidature.name}`,
          start: new Date(interview.date),

        }));
        console.log('✅ Entretiens chargés:', this.calendarOptions.events);
      },
      error: (error) => {
        console.error('❌ Erreur lors du chargement des entretiens:', error);
      }
    });
  }
  removeEvent(eventId: string) {
    let calendarApi = this.calendarComponent.getApi();
    let event = calendarApi.getEventById(eventId);
    if (event) {
      event.remove();
    }
  }

  resetForm() {
    this.selectedTime = '';
    this.selectedCandidat = undefined;
    this.selectedManager = null;
    this.interview = createEmptyInterview();
  }
}
