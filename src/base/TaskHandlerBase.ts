import * as _ from 'lodash';
import HandlerBase from './HandlerBase';

export default abstract class TaskHandlerBase extends HandlerBase{
  public async init() {
    const environment = this.resources.configuration.service.environment;
    const service = this.resources.configuration.service.service;

    const queue = `${environment}.${service}.${this.topic}`;

    await this.resources.rabbit.on(
      `${service}.${this.topic}`,        // topic
      this.callback.bind(this),          // callback
      queue,                             // queue
    );
    this.resources.logger.info('-', this.getName());
  }

  protected async callback(payload: any) {
    this.resources.logger.info('Handling task', this.topic);
    const data = _.get(payload, 'content', {});
    await this.handleCallback(data);
  }

  protected abstract async handleCallback(data: any): Promise<void>;

}