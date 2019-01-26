%% Zukey
%% test httpc error(socket_closed_remotely)
%% date: 2019-1-26
-module(t_httpc).
-export([test1/0, client/1, client_spawner/2]).

test1() ->
  inets:start(),
  ssl:start(),
  spawn(?MODULE, client_spawner, [self(), 100]),
  wait_for_all_jobs(1),
  ssl:stop(),
  inets:stop(),
  init:stop().

test2() ->
  inets:start(),
  ssl:start(),
  spawn(?MODULE, client_one, [self(), 100]),
  wait_for_all_jobs(1),
  ssl:stop(),
  inets:stop(),
  init:stop().

%% internal function
client(SenderPID) ->
  case httpc:request("http://www.google.com") of
    { error, Reason } -> io:format("Error. Reason: ~p\n", [Reason]);
    { ok, _ } -> io:format("ok\n")
  end,
  SenderPID ! 'FINISHED'.

client_spawner(_SenderPID, 0) -> io:format("Done.\n");
client_spawner(SenderPID, Times) ->
  spawn(?MODULE, client, [SenderPID]),
  client_spawner(SenderPID, Times - 1).

client_one(SenderPID, 0) -> io:format("Done.\n");
client_one(SenderPID, Times) ->
  case httpc:request("http://www.google.com") of
    { error, Reason } -> io:format("Error. Reason: ~p\n", [Reason]);
    { ok, _ } -> io:format("ok\n")
  end,
  SenderPID ! 'FINISHED',
  client_one(SenderPID, Times - 1).


wait_for_all_jobs(NumberOfFinishedJobs) ->
  receive 'FINISHED' ->
    if
      NumberOfFinishedJobs < 100 ->
        wait_for_all_jobs(NumberOfFinishedJobs + 1);
      true ->
        io:format("All jobs finished.\n")
    end
  end.

