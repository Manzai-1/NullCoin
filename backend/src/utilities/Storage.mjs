import fs from 'fs/promises';
import path from 'path';
import AppError from '../models/AppError.mjs'
import { APP_DIR } from '../config.mjs'

export default class Storage {
	#filePath = undefined;

	constructor(folder, filename) {
		this.initializeFolder(path.join(APP_DIR, folder)).then(
			this.#filePath = path.join(APP_DIR, folder, filename)
		);
	}

	async initializeFolder(folderPath) {
		try {
			await fs.access(folderPath);
		} catch (error) {
			await fs.mkdir(folderPath);
		}
	}

	async initializeFile(data) {
		if(! await this.fileExists()) {
			await this.writeToFile(data);
		}
	}

	async fileExists() {
		try {
			await fs.access(this.#filePath);
			return true;
		} catch {
			return false;
		}
	}

	async readFromFile() {
		try {
			return await fs.readFile(this.#filePath, 'utf-8');
		} catch (error) {
			throw new AppError(error, 500);
		}
	}

	async writeToFile(data) {
		try {
			await fs.writeFile(this.#filePath, data, 'utf-8');
		} catch (error) {
			throw new AppError(error, 500);
		}
	}

	async appendToFile(data) {
		try {
			await fs.appendFile(this.#filePath, data, 'utf-8');
		} catch (error) {
			throw new AppError(error, 500);
		}
	}
}
