using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace PayrollManager.Api.LeaveDays.SignalR
{
    public class Hubs : Hub
    {
        public async Task SendMessage(string message)
        {
            await Clients.All.SendAsync("ReceiveMessage", message);
        }
    }
}
