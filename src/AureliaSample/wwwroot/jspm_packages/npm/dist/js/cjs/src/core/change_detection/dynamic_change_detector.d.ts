import { AbstractChangeDetector } from './abstract_change_detector';
import { EventBinding } from './event_binding';
import { BindingTarget } from './binding_record';
import { DirectiveRecord, DirectiveIndex } from './directive_record';
import { Locals } from './parser/locals';
import { ChangeDispatcher, ChangeDetectorGenConfig } from './interfaces';
import { ChangeDetectionStrategy } from './constants';
import { ProtoRecord } from './proto_record';
export declare class DynamicChangeDetector extends AbstractChangeDetector<any> {
    private _records;
    private _eventBindings;
    private _directiveRecords;
    private _genConfig;
    values: any[];
    changes: any[];
    localPipes: any[];
    prevContexts: any[];
    constructor(id: string, numberOfPropertyProtoRecords: number, propertyBindingTargets: BindingTarget[], directiveIndices: DirectiveIndex[], strategy: ChangeDetectionStrategy, _records: ProtoRecord[], _eventBindings: EventBinding[], _directiveRecords: DirectiveRecord[], _genConfig: ChangeDetectorGenConfig);
    handleEventInternal(eventName: string, elIndex: number, locals: Locals): boolean;
    /** @internal */
    _processEventBinding(eb: EventBinding, locals: Locals): any;
    private _computeSkipLength(protoIndex, proto, values);
    /** @internal */
    _markPathAsCheckOnce(proto: ProtoRecord): void;
    /** @internal */
    _matchingEventBindings(eventName: string, elIndex: number): EventBinding[];
    hydrateDirectives(dispatcher: ChangeDispatcher): void;
    private _createEventHandler(boundElementIndex, eventName);
    dehydrateDirectives(destroyPipes: boolean): void;
    /** @internal */
    _destroyPipes(): void;
    /** @internal */
    _destroyDirectives(): void;
    checkNoChanges(): void;
    detectChangesInRecordsInternal(throwOnChange: boolean): void;
    /** @internal */
    _firstInBinding(r: ProtoRecord): boolean;
    afterContentLifecycleCallbacksInternal(): void;
    afterViewLifecycleCallbacksInternal(): void;
    /** @internal */
    private _updateDirectiveOrElement(change, bindingRecord);
    /** @internal */
    private _addChange(bindingRecord, change, changes);
    /** @internal */
    private _getDirectiveFor(directiveIndex);
    /** @internal */
    private _getDetectorFor(directiveIndex);
    /** @internal */
    private _check(proto, throwOnChange, values, locals);
    /** @internal */
    private _referenceCheck(proto, throwOnChange, values, locals);
    private _calculateCurrValue(proto, values, locals);
    private _pipeCheck(proto, throwOnChange, values);
    private _pipeFor(proto, context);
    private _readContext(proto, values);
    private _readSelf(proto, values);
    private _writeSelf(proto, value, values);
    private _readPipe(proto);
    private _writePipe(proto, value);
    private _setChanged(proto, value);
    private _pureFuncAndArgsDidNotChange(proto);
    private _argsChanged(proto);
    private _argsOrContextChanged(proto);
    private _readArgs(proto, values);
}
