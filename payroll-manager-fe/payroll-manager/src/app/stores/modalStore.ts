import { makeAutoObservable } from 'mobx';

export default class ModalStore {
	open: boolean = false;

	constructor() {
		makeAutoObservable(this);
	}

	openModal = () => {
		this.open = true;
	};

	closeModal = () => {
		this.open = false;
	};
}
