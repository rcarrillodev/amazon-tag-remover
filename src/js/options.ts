import { storage } from './api';

function saveOptions(e: Event) {
	e.preventDefault();
	storage.set({
		disableNotifications: document.querySelector<HTMLInputElement>('#disable-notifications')!.checked,
	});
	let list = new Set(document.querySelector<HTMLInputElement>('#referral')?.value.replace(/\n/,",").split(","));
	storage.set({
		whiteList: [...list].join(','),
	});
	window.close()
}

function restoreOptions() {
	function setCurrentChoice(result: any) {
		document.querySelector<HTMLInputElement>('#disable-notifications')!.checked = result.disableNotifications;
	}
	function showWhiteList(result: any) {
		debugger
		if (!result.whiteList) {
			return;
		}
		console.log(result.whiteList.toString())
		document.querySelector<HTMLTextAreaElement>('#referral')!.value = result.whiteList.replace(",","\n");
	}
	storage.get('whiteList').then(showWhiteList);
	storage.get('disableNotifications').then(setCurrentChoice);
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.querySelector('form')!.addEventListener('submit', saveOptions);
