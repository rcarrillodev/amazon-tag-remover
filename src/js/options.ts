import { storage } from './api';

function saveOptions(e: Event) {
	e.preventDefault();
	storage.set({
		disableNotifications: document.querySelector<HTMLInputElement>('#disable-notifications')!.checked,
	});
	if (document.querySelector<HTMLInputElement>('#referral')?.value) {
		let result;
		storage.get('whiteList').then((result) => {
			if (!result) {
				storage.set({
					whiteList: document.querySelector<HTMLInputElement>('#referral')?.value,
				});
				return;
			}
			let whiteList = result.whiteList.split(',');
			whiteList.push(document.querySelector<HTMLInputElement>('#referral')?.value);
			storage.set({
				whiteList: whiteList.toString(),
			});
		});
	}
}

function restoreOptions() {
	function setCurrentChoice(result: any) {
		document.querySelector<HTMLInputElement>('#disable-notifications')!.checked = result.disableNotifications;
	}
	function showWhiteList(result: any) {
		if (!result.whiteList) {
			return;
		}
		console.log(result.whiteList.split(','));
		let r = result.whiteList.split(',');
		r.forEach((element: string) => {
			let item = document.createElement('li');
			item.appendChild(document.createTextNode(element));
			document.querySelector<HTMLUListElement>('#whitelist')?.appendChild(item);
		});
	}
	storage.get('whiteList').then(showWhiteList);
	storage.get('disableNotifications').then(setCurrentChoice);
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.querySelector('form')!.addEventListener('submit', saveOptions);
